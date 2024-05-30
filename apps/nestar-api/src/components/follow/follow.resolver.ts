import { Mutation, Resolver, Query, Args} from '@nestjs/graphql';
import { FollowService } from './follow.service';

@Resolver()
export class FollowResolver {
    constructor (private readonly followService: FollowService ) {}

}
