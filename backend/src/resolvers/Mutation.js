const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // Check if user with submitted email exists
    const emailCheck = await ctx.db.query.user({ where: { email: args.email } });
    if (emailCheck) throw new Error(`${args.email} already has an account.  Please Log In.`);
    const nameCheck = await ctx.db.query.user({ where: { username: args.username } });
    // Check if user with submitted username exists
    if (nameCheck)
      throw new Error(`${args.username} already exists.  Please choose a new user name.`);
    // Set password hash and user info
    const password = await bcrypt.hash(args.password, 15);
    console.log(password);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          token: jwt.sign({ userId: args.email }, process.env.APP_SECRET),
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    console.log(user);
    // Create JWT and set as cookie
    const token = await jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    return user;
  },
  async login(parent, { email, password }, ctx, info) {
    // Check email and password
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No user for email: ${email}. Please sign up first.`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Wrong Password`);
    }
    // Create JWT and set as cookie
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14, // Two week token
    });
    console.log(user);
    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async createTournament(parent, args, ctx, info) {
    const tournament = await ctx.db.mutation.createTournament(
      {
        data: {
          ...args,
          startDate: args.startDate,
          members: {
            connect: { id: ctx.request.userId },
          },
        },
      },
      info
    );
    const tournamentMember = await ctx.db.mutation.createTournamentMember({
      data: {
        user: { connect: { id: ctx.request.userId } },
        tournament: { connect: { id: tournament.id } },
        role: 'ADMIN',
      },
    });
    const updatedTournament = await ctx.db.mutation.updateTournament({
      where: { id: tournament.id },
      data: {
        tournamentMembers: {
          connect: { id: tournamentMember.id },
        },
      },
    });
    const user = await ctx.db.mutation.updateUser({
      where: { id: ctx.request.userId },
      data: { tournamentMembers: { connect: { id: tournamentMember.id } } },
    });
    return tournament;
  },
  async removeTournament(parent, args, ctx, info) {
    const removedTournament = await ctx.db.mutation.deleteTournament({ where: { id: args.id } });
    return { message: 'Pool Deleted' };
  },
  async createTournamentRequest(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.userEmail } });
    if (!user) {
      console.log('No User Found!');
    }
    const tournamentRequest = await ctx.db.mutation.createTournamentRequest({
      data: {
        tournament: { connect: { id: args.tournament } },
        user: { connect: { id: user.id } },
      },
    });
    const updatedUser = await ctx.db.query.user({
      where: { email: args.userEmail },
      data: { tournamentRequests: { connect: { id: tournamentRequest.id } } },
    });
    return tournamentRequest;
  },
  async acceptRequest(parent, args, ctx, info) {
    const tournamentMember = await ctx.db.mutation.createTournamentMember({
      data: {
        user: { connect: { id: ctx.request.userId } },
        tournament: { connect: { id: args.tournamentId } },
        role: 'USER',
      },
    });
    const updatedTournament = await ctx.db.mutation.updateTournament({
      where: { id: args.tournamentId },
      data: {
        tournamentMembers: {
          connect: { id: tournamentMember.id },
        },
      },
    });
    const user = await ctx.db.mutation.updateUser({
      where: { id: ctx.request.userId },
      data: { tournamentMembers: { connect: { id: tournamentMember.id } } },
    });
    const deletedRequest = await ctx.db.mutation.deleteTournamentRequest({
      where: { id: args.id },
    });
    return user;
  },
  async deleteRequest(parent, args, ctx, info) {
    const deletedRequest = await ctx.db.mutation.deleteTournamentRequest({
      where: { id: args.id },
    });
    return { message: 'Request Deleted' };
  },
};

module.exports = Mutations;
