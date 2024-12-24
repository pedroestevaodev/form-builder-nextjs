import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";

const SignInPage = () => {
	return (
		<>
			<SignIn />
			<SignedIn>
				<UserButton />
			</SignedIn>
		</>
	);
};

export default SignInPage;