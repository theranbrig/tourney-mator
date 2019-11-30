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
    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async createTournament(parent, args, ctx, info) {
    if (args.maxMembers < 2) {
      throw new Error('Max Members must be more than 2.');
    }
    const tournament = await ctx.db.mutation.createTournament(
      {
        data: {
          ...args,
          startDate: args.startDate,
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
    const tourneyMembers = await ctx.db.mutation.deleteManyTournamentMembers({
      where: { tournament: { id: args.id } },
    });

    const removedTournament = await ctx.db.mutation.deleteTournament({ where: { id: args.id } });
    return { message: 'Pool Deleted' };
  },
  async leaveTournament(parent, args, ctx, info) {
    const tourneyMembers = await ctx.db.query.tournamentMembers({
      where: { AND: [{ tournament: { id: args.id } }, { user: { id: ctx.request.userId } }] },
    });
    if (tourneyMembers.length > 1) {
      throw new Error('Oops.  Something went wrong. Check with an Admin.');
    }
    if (tourneyMembers.length === 0) {
      throw new Error('No tournament matching that found.');
    }
    const tournaments = await ctx.db.query.tournaments({
      where: { members_some: { id: tourneyMembers[0].id } },
    });
    const updatedTournament = await ctx.db.mutation.updateTournament({
      where: { id: tournaments[0].id },
      data: { members: { disconnect: { id: ctx.request.userId } } },
    });
    const deletedTourneyMember = await ctx.db.mutation.deleteTournamentMember({
      where: { id: tourneyMembers[0].id },
    });
    console.log('DELETED', deletedTourneyMember);
    return { message: 'Removed from Tournament' };
  },
  async joinTournament(parent, args, ctx, info) {
    const tournament = await ctx.db.query.tournaments({
      where: { AND: [{ name: args.name }, { password: args.password }] },
    });
    if (!tournament.length) {
      throw new Error('Tournament with that name and password does exist.  Check again.');
    }
    const memberCheck = await ctx.db.query.tournamentMembers({
      where: {
        AND: [{ tournament: { id: tournament[0].id } }, { user: { id: ctx.request.userId } }],
      },
    });
    if (memberCheck.length) {
      throw new Error('You are already a member.');
    }
    const tournamentMember = await ctx.db.mutation.createTournamentMember({
      data: {
        user: { connect: { id: ctx.request.userId } },
        tournament: { connect: { id: tournament[0].id } },
        role: 'USER',
      },
    });
    console.log('MEMBER', tournamentMember);
    const updatedTournament = await ctx.db.mutation.updateTournament({
      where: { id: tournament[0].id },
      data: {
        tournamentMembers: {
          connect: { id: tournamentMember.id },
        },
      },
    });
    console.log('UPDATEDT', updatedTournament);
    const user = await ctx.db.mutation.updateUser({
      where: { id: ctx.request.userId },
      data: {
        tournamentMembers: {
          connect: { id: tournamentMember.id },
        },
      },
    });
    console.log('USER', user);
    return updatedTournament;
  },
  async createTournamentRequest(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.userEmail } });
    console.log(user);
    if (!user) {
      throw new Error(`No User Found.`);
    }
    if (user.id === ctx.request.userId) {
      throw new Error(`Cannot send a request to yourself.`);
    }
    const currentMember = await ctx.db.query.tournamentMembers(
      {
        where: { AND: [{ tournament: { id: args.tournament } }, { user: { id: user.id } }] },
      },
      info
    );
    if (currentMember.length) {
      throw new Error(`${user.username} is already a member.`);
    }
    const requestCheck = await ctx.db.query.tournamentRequests({
      where: { AND: [{ tournament: args.tournamentId }, { user: { id: user.id } }] },
    });
    console.log('REQUEST CHECK', requestCheck);
    if (requestCheck.length) {
      throw new Error(`Request already sent.  Waiting for response from ${user.username}.`);
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
      data: {
        tournamentMembers: { connect: { id: tournamentMember.id } },
      },
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
