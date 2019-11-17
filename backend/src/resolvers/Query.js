const { forwardTo } = require('prisma-binding');

const Query = {
  async me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    const user = await ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
    return user;
  },
  user: forwardTo('db'),
  tournament: forwardTo('db'),
  tournamentMember: forwardTo('db'),
};

module.exports = Query;
