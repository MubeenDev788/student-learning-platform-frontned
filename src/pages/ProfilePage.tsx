
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, ArrowLeft, Loader2, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const uploadProfilePic = (file: File) =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve(URL.createObjectURL(file)), 1200)
  );

const ProfilePage = () => {
  // Get user from route state or fallback (for demo)
  const location = useLocation();
  const user =
    location.state && location.state.user
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
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle profile image upload
  const handlePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setError("");
      try {
        const url = await uploadProfilePic(e.target.files[0]);
        setProfilePic(url);
      } catch {
        setError("Failed to upload image.");
      }
      setUploading(false);
    }
  };

  // Handle save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    // TODO: Integrate with backend/Supabase to save changes
    setTimeout(() => {
      setSaving(false);
      navigate("/", { replace: true });
    }, 1200);
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Back Button */}
      <div className="absolute left-0 top-0 mt-6 ml-6 z-10">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-700 shadow focus-visible:ring-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>
      {/* Main Profile Card */}
      <div className="flex flex-1 items-center justify-center py-12">
        <form
          onSubmit={handleSave}
          className="w-full max-w-md relative bg-white/95 shadow-2xl rounded-2xl px-8 py-10 flex flex-col gap-7 border border-gray-100"
        >
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight mb-2">
            My Profile
          </h2>
          <p className="text-center text-gray-500 font-medium mb-2 capitalize">
            {user.role}
          </p>
          {/* Avatar with edit */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-4 border-blue-100 shadow-lg">
                {profilePic ? (
                  <AvatarImage src={profilePic} alt={name} />
                ) : (
                  <AvatarFallback className="bg-blue-100">
                    <User className="w-12 h-12 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 shadow-xl cursor-pointer transition transform hover:scale-110 border-4 border-white group-hover:opacity-90 opacity-90"
                title="Change Profile Picture"
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Camera className="w-5 h-5 text-white" />
                )}
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePicChange}
                  className="hidden"
                  disabled={uploading || saving}
                />
              </label>
            </div>
            <span className="text-xs text-gray-400 mt-1">Click camera to change</span>
          </div>
          {/* Error display */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          {/* Editable Fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                required
                className="w-full shadow border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={saving}
                required
                className="w-full shadow border border-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Rating</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow-500">
                  {user.rating ? user.rating.toFixed(1) : "N/A"}
                </span>
                <span className="text-gray-400 text-sm">/ 5.0</span>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow"
              disabled={saving || uploading}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/")}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
