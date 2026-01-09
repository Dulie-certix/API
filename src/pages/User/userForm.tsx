import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { saveUser, updateUser } from "@/apis/userService";
import type { User } from "./userTable";

interface UserDetails {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  password: string;
}

interface UserFormProps {
  onSuccess?: () => void;
  editUser?: User | null;
  isEditing?: boolean;
}

export function UserForm({ onSuccess, editUser, isEditing = false }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDetails>(() => {
    if (isEditing && editUser) {
      return {
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        age: editUser.age,
        gender: editUser.gender as "male" | "female",
        email: editUser.email,
        phone: editUser.phone,
        username: editUser.username,
        password: editUser.password,
      };
    }
    return {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "male",
      email: "",
      phone: "",
      username: "",
      password: "",
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = isEditing && editUser 
        ? await updateUser(editUser._id, user)
        : await saveUser(user);
      
      if (result.success) {
        alert(isEditing ? 'User updated successfully!' : 'User saved successfully!');
        if (!isEditing) {
          setUser({
            firstName: "",
            lastName: "",
            age: 0,
            gender: "male",
            email: "",
            phone: "",
            username: "",
            password: "",
          });
        }
        onSuccess?.();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert(isEditing ? 'Failed to update user' : 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">First Name</label>
        <Input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Last Name</label>
        <Input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Age</label>
        <Input
          value={user.age}
          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Gender</label>
        <Select
          value={user.gender}
          onValueChange={(value) =>
            setUser({ ...user, gender: value as 'male' | 'female' })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Phone</label>
        <Input
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">User Name</label>
        <Input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update User' : 'Add User')}
      </Button>
    </form>
  );
}