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
    if (nameCheck) throw new Error(`${args.username} already exists.  Please choose a new user name.`);
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
    console.log(user)
    return user;
  },
  async signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async createTournament(parent, args, ctx, info) {
    // Set password hash and user info;
    const password = await bcrypt.hash(args.password, 15);
    const tournament = await ctx.db.mutation.createTournament(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    )
    return tournament
  }

};

module.exports = Mutations;
