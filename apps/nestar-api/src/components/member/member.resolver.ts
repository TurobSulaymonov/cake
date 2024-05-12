import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';


@Resolver()
export class MemberResolver {
    constructor (private readonly memberService: MemberService ) {}
   
    @Mutation(() => Member)  
    @UsePipes(ValidationPipe)
    public async signup(@Args('input') input: MemberInput): Promise<Member> {
        try{
        console.log("Mutation: signup");
        console.log("input", input);
        return this.memberService.signup(input);
    }
    catch(err){
     console.log("Error, Signup", err);
     throw new InternalServerErrorException;
    }
} 

    @Mutation(() => Member)
    @UsePipes(ValidationPipe)
    public async login(@Args('input') input: LoginInput): Promise<Member>{
        try{
            console.log("Mutation: login");
            console.log("LogInput", input)
            return this.memberService.login(input);
        }
        catch(err){
         console.log("Error, Login", err);
         throw new InternalServerErrorException;
        }
    } 
       
    

    @Mutation(() => String)
    public async updateMember(): Promise<string>{
        console.log("Mutation: updateMember");
        return this.memberService.memberUpdate();
    }

    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log("Query: getMember");
        return this.memberService.getMember();
    }
}
