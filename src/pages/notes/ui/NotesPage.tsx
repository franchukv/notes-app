import { useLogoutMutation } from '@/entities/user';
import { Button } from '@/shared/ui';

export const NotesPage = () => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <section>
      <div className="container">
        <div>
          <h1 className="text-preset-1">Notes Page</h1>

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </section>
  );
};
