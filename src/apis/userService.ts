interface UserData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

export const saveUser = async (userData: UserData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        firstName: userData.firstName,
        lastName: userData.lastName
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save user');
    }

    return { success: true, message: 'User saved successfully' };
  } catch (error) {
    console.error('Error saving user:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to save user' 
    };
  }
};

export const updateUser = async (id: string, userData: UserData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update user');
    }

    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error updating user:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to update user' 
    };
  }
};