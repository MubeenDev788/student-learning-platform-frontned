
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Upload, Loader2, Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
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

const DEFAULT_SOCIAL = {
  facebook: "",
  github: "",
  instagram: "",
  linkedin: "",
  youtube: ""
};

const ProfilePage = () => {
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
          social: { ...DEFAULT_SOCIAL },
        };

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [language, setLanguage] = useState(user.language);
  const [password, setPassword] = useState("");
  const [social, setSocial] = useState(
    user.social ? { ...DEFAULT_SOCIAL, ...user.social } : { ...DEFAULT_SOCIAL }
  );
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col py-8 px-2 md:px-8">
      {/* Avatar section at the top */}
      <div
        className="flex flex-col items-center justify-center w-full pt-6 pb-2"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className="relative group mb-3">
          <Avatar className="w-36 h-36 shadow-xl border-4 border-white bg-gray-100">
            {profilePic ? (
              <AvatarImage src={profilePic} alt={name} />
            ) : (
              <AvatarFallback className="bg-white">
                <User className="w-16 h-16 text-gray-300" />
              </AvatarFallback>
            )}
          </Avatar>
          <input
            ref={avatarInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onAvatarChange}
            disabled={uploading}
            id="avatar-upload"
          />
          <button
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full shadow p-2 border border-blue-200 hover:bg-blue-50 transition"
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            disabled={uploading}
            title="Upload avatar"
          >
            <Upload className="w-5 h-5 text-blue-600" />
          </button>
          {uploading && (
            <div className="absolute bg-white/70 rounded-full w-full h-full flex items-center justify-center left-0 top-0">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}
        </div>
        <p className="text-gray-900 font-semibold text-lg text-center">{name}</p>
        <p className="text-blue-500 text-center">{role}</p>
        <Button
          className="mt-4 text-blue-700 bg-blue-100 hover:bg-blue-200 px-6 py-2 rounded-2xl font-medium shadow-md transition"
          type="button"
          onClick={() => navigate("/")}
          title="Back to Dashboard"
          variant="outline"
        >
          &larr; Back to Dashboard
        </Button>
      </div>

      {/* Main Details/Edit Form */}
      <form
        id="profile-form"
        onSubmit={handleSave}
        className="w-full bg-white rounded-2xl p-6 md:p-12 shadow-lg mt-6 mx-auto"
        style={{ maxWidth: "100%", minWidth: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Profile Settings</h1>
        <p className="mb-5 text-gray-500">You can edit your info below.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <Input value={username} onChange={e => setUsername(e.target.value)} disabled={saving} className="bg-gray-50"/>
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email <span className="text-red-500">*</span></label>
            <Input value={email} type="email" required onChange={e => setEmail(e.target.value)} disabled={saving} className="bg-gray-50"/>
          </div>
          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <Input value={password} type="password" autoComplete="new-password" onChange={e => setPassword(e.target.value)} disabled={saving} className="bg-gray-50" placeholder="Leave blank to keep unchanged"/>
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
            <Input value={name} onChange={e => setName(e.target.value)} disabled={saving} required className="bg-gray-50"/>
          </div>
          {/* Title */}
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <Input value={role} onChange={e => setRole(e.target.value)} disabled={saving} className="bg-gray-50" placeholder="e.g. Administrator"/>
          </div>
          {/* Language */}
          <div>
            <label className="block text-gray-600 mb-1">Language</label>
            <select className="w-full h-10 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-base"
              value={language} disabled={saving} onChange={e => setLanguage(e.target.value)}>
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </div>
        {/* Socials */}
        <hr className="my-6"/>
        <div>
          <label className="block text-gray-600 font-semibold mb-2">Social Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SOCIAL_FIELDS.map(field => (
              <div key={field.key} className="flex items-center gap-2">
                <field.Icon className="w-5 h-5 text-blue-400" />
                <Input
                  type="url"
                  inputMode="url"
                  placeholder={field.placeholder}
                  value={social && social[field.key] ? social[field.key] : ""}
                  onChange={e => setSocial({ ...social, [field.key]: e.target.value })}
                  className="bg-gray-50"
                  disabled={saving}
                />
                {Boolean(social && social[field.key]) && (
                  <a
                    href={social[field.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs hover:bg-blue-100 transition"
                  >
                    Visit
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
        <div className="mt-10 flex gap-4">
          <Button type="submit" className="px-7 py-2.5 text-base" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")} disabled={saving}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

