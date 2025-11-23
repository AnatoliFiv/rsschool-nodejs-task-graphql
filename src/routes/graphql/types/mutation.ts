import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { CreatePostInput, ChangePostInput } from './post.js';
import { CreateProfileInput, ChangeProfileInput } from './profile.js';
import { CreateUserInput, ChangeUserInput } from './user.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

export const MutationsType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
        },
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInput),
        },
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInput),
        },
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInput),
        },
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInput),
        },
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeUserInput),
        },
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
    },
  }),
});
