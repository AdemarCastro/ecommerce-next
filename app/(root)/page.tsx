import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className='p-4'>
      <UserButton afterSignOutUrl="/" />
      Está é uma rota protegida!
    </div>
  );
}

export default SetupPage;
