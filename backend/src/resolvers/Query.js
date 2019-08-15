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
};

module.exports = Query;
