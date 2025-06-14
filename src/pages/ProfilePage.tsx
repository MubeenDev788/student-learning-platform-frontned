
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Dummy function for uploading images (replace with backend/Supabase integration)
const uploadProfilePic = (file: File) =>
  new Promise<string>((resolve) => setTimeout(() => resolve(URL.createObjectURL(file)), 1000));

const ProfilePage = () => {
  // Retrieve user passed via navigation state
  const location = useLocation();
  const user = location.state && location.state.user
    ? location.state.user
    : {
        name: "John Doe",
        email: "johndoe@email.com",
        role: "student",
        rating: 4.5,
        profilePic: "",
      };

  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [rating] = useState(user.rating || 0); // Typically not editable by user
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handlePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const url = await uploadProfilePic(e.target.files[0]);
      setProfilePic(url);
      setUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save the form data to backend (or local state as a placeholder)
    alert("Profile updated! (No backend yet)");
    navigate(-1); // Go back after save
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6 relative"
      >
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h2>
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-24 h-24 mb-2">
            <Avatar className="w-24 h-24">
              {profilePic ? (
                <AvatarImage src={profilePic} alt={name} />
              ) : (
                <AvatarFallback>
                  <User className="w-12 h-12 text-gray-300" />
                </AvatarFallback>
              )}
            </Avatar>
            <label className="absolute bottom-0 right-0 bg-blue-500 cursor-pointer text-white px-2 py-1 rounded-full text-xs shadow-md">
              <Input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handlePicChange}
                className="hidden"
              />
              Edit
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-600 font-semibold mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">Rating</label>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg text-yellow-500">{rating}</span>
              <span className="text-gray-400 text-sm">/ 5.0</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button type="submit" disabled={uploading} className="flex-1">
              {uploading ? "Uploading..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
