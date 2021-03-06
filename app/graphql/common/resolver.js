const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return new Date(value).getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return Number.parseInt(ast.value, 10);
      }
      return null;
    }
  })
};
