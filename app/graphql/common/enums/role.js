const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
  name: 'Role',
  values: {
    Admin: { value: 1 },
    Regular: { value: 2 }
  }
});
