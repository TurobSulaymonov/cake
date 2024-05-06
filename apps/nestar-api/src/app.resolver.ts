import {Query, Resolver} from "@nestjs/graphql";
import { query } from "express";
@Resolver()
export class AppResolver {
    @Query(() => String)
    public sayHello(): string {
        return "GraphQL API Server";
    }
}