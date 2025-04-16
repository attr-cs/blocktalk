export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followers: number;
  following: number;
  joinDate: string;
  backgroundUrl?: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Biome {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  membersCount: number;
  postsCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export const currentUser: User = {
  id: "user-1",
  username: "steve_miner",
  displayName: "Steve",
  avatarUrl: "/images/avatars/minecraft_steve.png",
  bio: "Just a miner trying to survive the night. Love building and exploring!",
  followers: 1024,
  following: 256,
  joinDate: "2022-01-15",
  backgroundUrl: "/images/backgrounds/plains.jpg"
};

export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    username: "alex_builder",
    displayName: "Alex",
    avatarUrl: "/images/avatars/minecraft_alex.png",
    bio: "Creative mode enthusiast. I build massive structures and redstone contraptions!",
    followers: 2048,
    following: 512,
    joinDate: "2022-02-10",
    backgroundUrl: "/images/backgrounds/forest.jpg"
  },
  {
    id: "user-3",
    username: "enderman_pete",
    displayName: "Pete",
    avatarUrl: "/images/avatars/minecraft_enderman.png",
    bio: "Don't look at me directly! Collecting blocks is my passion.",
    followers: 1536,
    following: 384,
    joinDate: "2022-03-05",
    backgroundUrl: "/images/backgrounds/end.jpg"
  },
  {
    id: "user-4",
    username: "creeper_ssssam",
    displayName: "Sam",
    avatarUrl: "/images/avatars/minecraft_creeper.png",
    bio: "Just looking for a hug! Explosive personality.",
    followers: 3072,
    following: 768,
    joinDate: "2022-04-20",
    backgroundUrl: "/images/backgrounds/explosion.jpg"
  }
];

export const posts: Post[] = [
  {
    id: "post-1",
    userId: "user-2",
    username: "alex_builder",
    avatarUrl: "/images/avatars/minecraft_alex.png",
    content: "Just finished my new castle build! What do you think?",
    imageUrl: "/images/posts/castle.jpg",
    likes: 128,
    comments: 32,
    createdAt: "2023-04-15T14:30:00Z",
    isLiked: false
  },
  {
    id: "post-2",
    userId: "user-3",
    username: "enderman_pete",
    avatarUrl: "/images/avatars/minecraft_enderman.png",
    content: "Found this amazing cave system today. So many diamonds!",
    imageUrl: "/images/posts/cave.jpg",
    likes: 256,
    comments: 64,
    createdAt: "2023-04-14T10:15:00Z",
    isLiked: true
  },
  {
    id: "post-3",
    userId: "user-4",
    username: "creeper_ssssam",
    avatarUrl: "/images/avatars/minecraft_creeper.png",
    content: "Blew up someone's house today. Oops! Sorry not sorry.",
    imageUrl: "/images/posts/explosion.jpg",
    likes: 512,
    comments: 128,
    createdAt: "2023-04-13T18:45:00Z",
    isLiked: false
  },
  {
    id: "post-4",
    userId: "user-1",
    username: "steve_miner",
    avatarUrl: "/images/avatars/minecraft_steve.png",
    content: "Just survived a night in hardcore mode! Heart was racing!",
    likes: 384,
    comments: 96,
    createdAt: "2023-04-12T22:30:00Z",
    isLiked: false
  }
];

export const comments: Comment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    userId: "user-1",
    username: "steve_miner",
    avatarUrl: "/images/avatars/steve.png",
    content: "Wow, that's an amazing castle! How long did it take you to build?",
    createdAt: "2023-04-15T15:00:00Z",
    likes: 16
  },
  {
    id: "comment-2",
    postId: "post-1",
    userId: "user-3",
    username: "enderman_pete",
    avatarUrl: "/images/avatars/enderman.png",
    content: "The detail on those towers is incredible!",
    createdAt: "2023-04-15T15:30:00Z",
    likes: 8
  },
  {
    id: "comment-3",
    postId: "post-2",
    userId: "user-4",
    username: "creeper_ssssam",
    avatarUrl: "/images/avatars/creeper.png",
    content: "I love exploring caves! But sometimes I get lost...",
    createdAt: "2023-04-14T11:00:00Z",
    likes: 24
  }
];

export const biomes: Biome[] = [
  {
    id: "biome-forest",
    name: "Forest Realm",
    description: "A lush green realm for nature lovers and builders.",
    imageUrl: "/images/biomes/forestbiome.jfif",
    membersCount: 4096,
    postsCount: 16384
  },
  {
    id: "biome-desert",
    name: "Desert Nomads",
    description: "For those who love the challenge of desert survival.",
    imageUrl: "/images/biomes/desertbiome.jfif",
    membersCount: 2048,
    postsCount: 8192
  },
  {
    id: "biome-ocean",
    name: "Ocean Explorers",
    description: "Dive deep into underwater builds and adventures.",
    imageUrl: "/images/biomes/oceanbiome.webp",
    membersCount: 3072,
    postsCount: 12288
  },
  {
    id: "biome-mountain",
    name: "Mountain Dwellers",
    description: "For those who build epic mountain bases and villages.",
    imageUrl: "/images/biomes/mountainbiome.webp",
    membersCount: 1536,
    postsCount: 6144
  }
];

export const messages: Message[] = [
  {
    id: "msg-1",
    senderId: "user-2",
    senderName: "Alex",
    senderAvatar: "/images/avatars/alex.png",
    content: "Hey! Want to join my survival server?",
    timestamp: "2023-04-15T14:30:00Z",
    isCurrentUser: false
  },
  {
    id: "msg-2",
    senderId: "user-1",
    senderName: "Steve",
    senderAvatar: "/images/avatars/steve.png",
    content: "Sure! Send me the IP.",
    timestamp: "2023-04-15T14:32:00Z",
    isCurrentUser: true
  },
  {
    id: "msg-3",
    senderId: "user-2",
    senderName: "Alex",
    senderAvatar: "/images/avatars/alex.png",
    content: "It's play.minecraftserver.com",
    timestamp: "2023-04-15T14:33:00Z",
    isCurrentUser: false
  },
  {
    id: "msg-4",
    senderId: "user-1",
    senderName: "Steve",
    senderAvatar: "/images/avatars/steve.png",
    content: "Thanks! What mode are you playing in?",
    timestamp: "2023-04-15T14:35:00Z",
    isCurrentUser: true
  },
  {
    id: "msg-5",
    senderId: "user-2",
    senderName: "Alex",
    senderAvatar: "/images/avatars/alex.png",
    content: "Survival with a few quality of life mods. Nothing too crazy!",
    timestamp: "2023-04-15T14:37:00Z",
    isCurrentUser: false
  }
];
