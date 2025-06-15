
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Upload, Loader2, ArrowLeft, Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const uploadProfilePic = (file: File) =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve(URL.createObjectURL(file)), 1000)
  );

const SOCIAL_FIELDS = [
  { key: "facebook", label: "Facebook", Icon: Facebook, placeholder: "Facebook URL" },
  { key: "github", label: "GitHub", Icon: Github, placeholder: "GitHub URL" },
  { key: "instagram", label: "Instagram", Icon: Instagram, placeholder: "Instagram URL" },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin, placeholder: "LinkedIn URL" },
  { key: "youtube", label: "YouTube", Icon: Youtube, placeholder: "YouTube URL" },
];

const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese"];

const ProfilePage = () => {
  // Get user from route state or fallback (for demo)
  const location = useLocation();
  const navigate = useNavigate();
  const user =
    location.state && location.state.user
      ? location.state.user
      : {
          username: "ryan",
          name: "John Doe",
          email: "ryan@example.com",
          role: "Administrator",
          language: "English",
          rating: 4.5,
          profilePic: "",
          social: {
            facebook: "",
            github: "",
            instagram: "",
            linkedin: "",
            youtube: "",
          },
        };

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [language, setLanguage] = useState(user.language);
  const [password, setPassword] = useState("");
  const [social, setSocial] = useState(user.social);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Handle profile image upload
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Drag-drop avatar
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploading(true);
      setError("");
      try {
        const url = await uploadProfilePic(e.dataTransfer.files[0]);
        setProfilePic(url);
      } catch {
        setError("Failed to upload image.");
      }
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    // TODO: integrate with backend
    setTimeout(() => {
      setSaving(false);
      navigate("/", { replace: true });
    }, 900);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-2">
      {/* Top bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <Button 
            size="icon"
            variant="ghost" 
            className="rounded-full" 
            onClick={() => navigate("/")}
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-medium text-lg">User: <span className="text-gray-900">{username}</span></span>
        </div>
        <Button 
          type="submit" 
          form="profile-form"
          className="px-6 py-2" 
          disabled={saving}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
      {/* Card */}
      <form
        id="profile-form"
        onSubmit={handleSave}
        className="bg-white max-w-4xl mx-auto rounded-2xl shadow-lg flex gap-12 p-8 flex-col md:flex-row"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 w-full md:w-[260px]">
          <div className="relative mb-3">
            <Avatar className="w-32 h-32 shadow-lg border-4 border-gray-200">
              {profilePic ? (
                <AvatarImage src={profilePic} alt={name} />
              ) : (
                <AvatarFallback className="bg-gray-200">
                  <User className="w-14 h-14 text-gray-400" />
                </AvatarFallback>
              )}
            </Avatar>
            {/* Invisible input for avatar */}
            <input
              ref={avatarInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onAvatarChange}
              disabled={uploading}
              id="avatar-upload"
            />
          </div>
          <div
            className={`w-56 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-400 text-base bg-gray-50 hover:bg-gray-100 transition
              ${uploading ? 'opacity-60' : ''}`}
            onClick={() => avatarInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            tabIndex={0}
            title="Upload new profile picture"
          >
            {uploading ? <Loader2 className="animate-spin w-6 h-6 mb-1" /> :
              <>
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs">Drop your files here or <span className="font-medium text-blue-700">click in this area</span></span>
              </>
            }
          </div>
          <span className="text-xs text-gray-400 mt-2">Avatar by gravatar.com. Or upload your own...</span>
        </div>
        {/* Info fields */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-blue-600 underline">{email}</span>
            <span className="text-gray-500">- {role}</span>
            {user.rating !== undefined && (
              <div className="ml-3 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full text-yellow-800 font-semibold text-xs border border-yellow-200">
                ★ {Number(user.rating).toFixed(1)}
              </div>
            )}
          </div>
          <hr className="my-5"/>
          {/* Account section */}
          <div className="font-semibold text-gray-700 mb-3">Account</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-600 mb-1">Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={saving}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={saving}
                required
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <Input
                value={password}
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={saving}
                className="bg-gray-50"
                placeholder="Leave blank to keep unchanged"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                required
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Title</label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={saving}
                className="bg-gray-50"
                placeholder="e.g. Administrator"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Language</label>
              <select
                className="w-full h-10 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-base"
                value={language}
                disabled={saving}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Social links */}
          <hr className="my-7"/>
          <div className="font-semibold text-gray-700 mb-3">Social Links</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            {SOCIAL_FIELDS.map((field) => (
              <div key={field.key} className="flex items-center gap-3">
                <field.Icon className="w-5 h-5 text-gray-400" />
                <Input
                  type="url"
                  inputMode="url"
                  placeholder={field.placeholder}
                  value={social[field.key]}
                  onChange={e => setSocial({ ...social, [field.key]: e.target.value })}
                  className="bg-gray-50"
                  disabled={saving}
                />
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

