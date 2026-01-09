import { User } from "@/pages/User/userTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface UserViewDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserViewDialog({ user, open, onOpenChange }: UserViewDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">{user.phone}</p>
            </div>
            <div>
              <p className="font-medium">Age</p>
              <p className="text-muted-foreground">{user.age}</p>
            </div>
            <div>
              <p className="font-medium">Gender</p>
              <p className="text-muted-foreground capitalize">{user.gender}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}