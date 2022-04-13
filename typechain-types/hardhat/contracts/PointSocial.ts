/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../common";

export declare namespace PointSocial {
  export type CommentStruct = {
    id: BigNumberish;
    from: string;
    contents: BytesLike;
    createdAt: BigNumberish;
  };

  export type CommentStructOutput = [BigNumber, string, string, BigNumber] & {
    id: BigNumber;
    from: string;
    contents: string;
    createdAt: BigNumber;
  };

  export type PostStruct = {
    id: BigNumberish;
    from: string;
    contents: BytesLike;
    image: BytesLike;
    createdAt: BigNumberish;
    likesCount: BigNumberish;
    commentsCount: BigNumberish;
  };

  export type PostStructOutput = [
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    number,
    number
  ] & {
    id: BigNumber;
    from: string;
    contents: string;
    image: string;
    createdAt: BigNumber;
    likesCount: number;
    commentsCount: number;
  };
}

export interface PointSocialInterface extends utils.Interface {
  functions: {
    "add(uint256,address,bytes32,bytes32,uint16,uint256)": FunctionFragment;
    "addComment(uint256,uint256,address,bytes32,uint256)": FunctionFragment;
    "addCommentToPost(uint256,bytes32)": FunctionFragment;
    "addLikeToPost(uint256)": FunctionFragment;
    "addMigrator(address)": FunctionFragment;
    "addPost(bytes32,bytes32)": FunctionFragment;
    "commentById(uint256)": FunctionFragment;
    "commentIdsByOwner(address,uint256)": FunctionFragment;
    "commentIdsByPost(uint256,uint256)": FunctionFragment;
    "getAllCommentsForPost(uint256)": FunctionFragment;
    "getAllPosts()": FunctionFragment;
    "getAllPostsByOwner(address)": FunctionFragment;
    "getAllPostsByOwnerLength(address)": FunctionFragment;
    "getAllPostsLength()": FunctionFragment;
    "getPaginatedPosts(uint256,uint256)": FunctionFragment;
    "getPaginatedPostsByOwner(address,uint256,uint256)": FunctionFragment;
    "getPostById(uint256)": FunctionFragment;
    "initialize()": FunctionFragment;
    "likeById(uint256)": FunctionFragment;
    "likeIdsByPost(uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "postById(uint256)": FunctionFragment;
    "postIds(uint256)": FunctionFragment;
    "postIdsByOwner(address,uint256)": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "add"
      | "addComment"
      | "addCommentToPost"
      | "addLikeToPost"
      | "addMigrator"
      | "addPost"
      | "commentById"
      | "commentIdsByOwner"
      | "commentIdsByPost"
      | "getAllCommentsForPost"
      | "getAllPosts"
      | "getAllPostsByOwner"
      | "getAllPostsByOwnerLength"
      | "getAllPostsLength"
      | "getPaginatedPosts"
      | "getPaginatedPostsByOwner"
      | "getPostById"
      | "initialize"
      | "likeById"
      | "likeIdsByPost"
      | "owner"
      | "postById"
      | "postIds"
      | "postIdsByOwner"
      | "proxiableUUID"
      | "renounceOwnership"
      | "transferOwnership"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "add",
    values: [
      BigNumberish,
      string,
      BytesLike,
      BytesLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addComment",
    values: [BigNumberish, BigNumberish, string, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addCommentToPost",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addLikeToPost",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "addMigrator", values: [string]): string;
  encodeFunctionData(
    functionFragment: "addPost",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "commentById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commentIdsByOwner",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commentIdsByPost",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllCommentsForPost",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllPosts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllPostsByOwner",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllPostsByOwnerLength",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllPostsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPaginatedPosts",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaginatedPostsByOwner",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPostById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "likeById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "likeIdsByPost",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "postById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "postIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "postIdsByOwner",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "upgradeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addComment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addCommentToPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addLikeToPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addMigrator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addPost", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "commentById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentIdsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commentIdsByPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllCommentsForPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllPosts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllPostsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllPostsByOwnerLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllPostsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaginatedPosts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaginatedPostsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPostById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "likeById", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "likeIdsByPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "postById", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "postIds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "postIdsByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "StateChange(uint256,address,uint256,uint8)": EventFragment;
    "Upgraded(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StateChange"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
}

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface StateChangeEventObject {
  postId: BigNumber;
  from: string;
  date: BigNumber;
  action: number;
}
export type StateChangeEvent = TypedEvent<
  [BigNumber, string, BigNumber, number],
  StateChangeEventObject
>;

export type StateChangeEventFilter = TypedEventFilter<StateChangeEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface PointSocial extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PointSocialInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    add(
      id: BigNumberish,
      author: string,
      contents: BytesLike,
      image: BytesLike,
      likesCount: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addComment(
      id: BigNumberish,
      postId: BigNumberish,
      author: string,
      contents: BytesLike,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addCommentToPost(
      postId: BigNumberish,
      contents: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addLikeToPost(
      postId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addMigrator(
      migrator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addPost(
      contents: BytesLike,
      image: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commentById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        from: string;
        contents: string;
        createdAt: BigNumber;
      }
    >;

    commentIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    commentIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAllCommentsForPost(
      postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PointSocial.CommentStructOutput[]]>;

    getAllPosts(
      overrides?: CallOverrides
    ): Promise<[PointSocial.PostStructOutput[]]>;

    getAllPostsByOwner(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[PointSocial.PostStructOutput[]]>;

    getAllPostsByOwnerLength(
      owner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAllPostsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPaginatedPosts(
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PointSocial.PostStructOutput[]]>;

    getPaginatedPostsByOwner(
      owner: string,
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PointSocial.PostStructOutput[]]>;

    getPostById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PointSocial.PostStructOutput]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    likeById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        id: BigNumber;
        from: string;
        createdAt: BigNumber;
      }
    >;

    likeIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    postById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, string, BigNumber, number, number] & {
        id: BigNumber;
        from: string;
        contents: string;
        image: string;
        createdAt: BigNumber;
        likesCount: number;
        commentsCount: number;
      }
    >;

    postIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    postIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  add(
    id: BigNumberish,
    author: string,
    contents: BytesLike,
    image: BytesLike,
    likesCount: BigNumberish,
    createdAt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addComment(
    id: BigNumberish,
    postId: BigNumberish,
    author: string,
    contents: BytesLike,
    createdAt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addCommentToPost(
    postId: BigNumberish,
    contents: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addLikeToPost(
    postId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addMigrator(
    migrator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addPost(
    contents: BytesLike,
    image: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commentById(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, BigNumber] & {
      id: BigNumber;
      from: string;
      contents: string;
      createdAt: BigNumber;
    }
  >;

  commentIdsByOwner(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  commentIdsByPost(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAllCommentsForPost(
    postId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PointSocial.CommentStructOutput[]>;

  getAllPosts(
    overrides?: CallOverrides
  ): Promise<PointSocial.PostStructOutput[]>;

  getAllPostsByOwner(
    owner: string,
    overrides?: CallOverrides
  ): Promise<PointSocial.PostStructOutput[]>;

  getAllPostsByOwnerLength(
    owner: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAllPostsLength(overrides?: CallOverrides): Promise<BigNumber>;

  getPaginatedPosts(
    cursor: BigNumberish,
    howMany: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PointSocial.PostStructOutput[]>;

  getPaginatedPostsByOwner(
    owner: string,
    cursor: BigNumberish,
    howMany: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PointSocial.PostStructOutput[]>;

  getPostById(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PointSocial.PostStructOutput>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  likeById(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber] & {
      id: BigNumber;
      from: string;
      createdAt: BigNumber;
    }
  >;

  likeIdsByPost(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  postById(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, string, string, BigNumber, number, number] & {
      id: BigNumber;
      from: string;
      contents: string;
      image: string;
      createdAt: BigNumber;
      likesCount: number;
      commentsCount: number;
    }
  >;

  postIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  postIdsByOwner(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    add(
      id: BigNumberish,
      author: string,
      contents: BytesLike,
      image: BytesLike,
      likesCount: BigNumberish,
      createdAt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addComment(
      id: BigNumberish,
      postId: BigNumberish,
      author: string,
      contents: BytesLike,
      createdAt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    addCommentToPost(
      postId: BigNumberish,
      contents: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    addLikeToPost(
      postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addMigrator(migrator: string, overrides?: CallOverrides): Promise<void>;

    addPost(
      contents: BytesLike,
      image: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    commentById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, BigNumber] & {
        id: BigNumber;
        from: string;
        contents: string;
        createdAt: BigNumber;
      }
    >;

    commentIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    commentIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllCommentsForPost(
      postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PointSocial.CommentStructOutput[]>;

    getAllPosts(
      overrides?: CallOverrides
    ): Promise<PointSocial.PostStructOutput[]>;

    getAllPostsByOwner(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PointSocial.PostStructOutput[]>;

    getAllPostsByOwnerLength(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllPostsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getPaginatedPosts(
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PointSocial.PostStructOutput[]>;

    getPaginatedPostsByOwner(
      owner: string,
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PointSocial.PostStructOutput[]>;

    getPostById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PointSocial.PostStructOutput>;

    initialize(overrides?: CallOverrides): Promise<void>;

    likeById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        id: BigNumber;
        from: string;
        createdAt: BigNumber;
      }
    >;

    likeIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    postById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, string, string, BigNumber, number, number] & {
        id: BigNumber;
        from: string;
        contents: string;
        image: string;
        createdAt: BigNumber;
        likesCount: number;
        commentsCount: number;
      }
    >;

    postIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    postIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: string | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "StateChange(uint256,address,uint256,uint8)"(
      postId?: null,
      from?: string | null,
      date?: BigNumberish | null,
      action?: BigNumberish | null
    ): StateChangeEventFilter;
    StateChange(
      postId?: null,
      from?: string | null,
      date?: BigNumberish | null,
      action?: BigNumberish | null
    ): StateChangeEventFilter;

    "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
    Upgraded(implementation?: string | null): UpgradedEventFilter;
  };

  estimateGas: {
    add(
      id: BigNumberish,
      author: string,
      contents: BytesLike,
      image: BytesLike,
      likesCount: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addComment(
      id: BigNumberish,
      postId: BigNumberish,
      author: string,
      contents: BytesLike,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addCommentToPost(
      postId: BigNumberish,
      contents: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addLikeToPost(
      postId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addMigrator(
      migrator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addPost(
      contents: BytesLike,
      image: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commentById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    commentIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    commentIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllCommentsForPost(
      postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllPosts(overrides?: CallOverrides): Promise<BigNumber>;

    getAllPostsByOwner(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllPostsByOwnerLength(
      owner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAllPostsLength(overrides?: CallOverrides): Promise<BigNumber>;

    getPaginatedPosts(
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPaginatedPostsByOwner(
      owner: string,
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPostById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    likeById(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    likeIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    postById(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    postIds(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    postIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    add(
      id: BigNumberish,
      author: string,
      contents: BytesLike,
      image: BytesLike,
      likesCount: BigNumberish,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addComment(
      id: BigNumberish,
      postId: BigNumberish,
      author: string,
      contents: BytesLike,
      createdAt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addCommentToPost(
      postId: BigNumberish,
      contents: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addLikeToPost(
      postId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addMigrator(
      migrator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addPost(
      contents: BytesLike,
      image: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commentById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commentIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    commentIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllCommentsForPost(
      postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllPosts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllPostsByOwner(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllPostsByOwnerLength(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAllPostsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPaginatedPosts(
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPaginatedPostsByOwner(
      owner: string,
      cursor: BigNumberish,
      howMany: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPostById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    likeById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    likeIdsByPost(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    postById(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    postIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    postIdsByOwner(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
