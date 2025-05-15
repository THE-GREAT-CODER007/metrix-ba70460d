
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Define avatar options - animated avatars
const avatarOptions = [
  {
    id: 'default',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/62ebc617eafeec75b502e68c_Animation%201.gif',
    name: 'Default'
  },
  {
    id: 'avatar1',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/6424718b1cc4f5a1f10af748_6.gif',
    name: 'Avatar 1'
  },
  {
    id: 'avatar2',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/63b603f6f3d0b04a1d312d3f_Phone%20Anim.gif',
    name: 'Avatar 2'
  },
  {
    id: 'avatar3',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/64db9dc1ef95d1e0c33a6826_Vici%20floating%20head%2002.gif',
    name: 'Avatar 3'
  },
  {
    id: 'avatar4',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/6388a0af5cee76e186178b9e_Transparent_AV.gif',
    name: 'Avatar 4'
  },
  {
    id: 'avatar5',
    url: 'https://assets-global.website-files.com/5c4004b5b11b6939a133b415/63e2a3ae8ea1d296a1de9dca_Head%20Shake.gif',
    name: 'Avatar 5'
  }
];

type ProfileAvatarProps = {
  defaultAvatarUrl: string;
  onAvatarChange: (url: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ defaultAvatarUrl, onAvatarChange }) => {
  const { toast } = useToast();
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState('default');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedAvatarId('custom');
    }
  };

  const handleAvatarUpload = () => {
    if (selectedAvatarId === 'custom' && previewUrl) {
      onAvatarChange(previewUrl);
    } else {
      const selectedAvatar = avatarOptions.find(avatar => avatar.id === selectedAvatarId);
      if (selectedAvatar) {
        onAvatarChange(selectedAvatar.url);
      }
    }
    setIsAvatarDialogOpen(false);
    toast({
      title: "Profile Photo Updated",
      description: "Your profile photo has been changed successfully.",
    });
  };

  const selectAvatar = (id: string, url: string) => {
    setSelectedAvatarId(id);
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  return (
    <div className="relative mb-4 group">
      <Avatar className="w-28 h-28 ring-4 ring-offset-2 ring-offset-background ring-primary/30 transition-all duration-300 group-hover:scale-105">
        <AvatarImage src={defaultAvatarUrl} className="object-cover" />
        <AvatarFallback className="text-xl">CN</AvatarFallback>
      </Avatar>
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Profile Avatar</DialogTitle>
            <DialogDescription>
              Choose an animated avatar or upload your own image.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 ring-2 ring-primary/40">
                <AvatarImage src={previewUrl || defaultAvatarUrl} className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              <div className="grid grid-cols-3 gap-4 w-full">
                {avatarOptions.map(avatar => (
                  <div 
                    key={avatar.id}
                    className={`cursor-pointer transition-all rounded-md ${selectedAvatarId === avatar.id ? 'ring-2 ring-primary scale-110' : 'hover:scale-105'}`}
                    onClick={() => selectAvatar(avatar.id, avatar.url)}
                  >
                    <Avatar className="w-full h-auto">
                      <AvatarImage src={avatar.url} className="object-cover" />
                      <AvatarFallback>{avatar.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              
              <div className="space-y-1 w-full">
                <Label htmlFor="picture" className="text-sm">Or upload your own:</Label>
                <Input 
                  id="picture" 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm"
                />
              </div>
              <p className="text-sm text-gray-500">Supported formats: JPEG, PNG, GIF. Max size: 5MB.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAvatarUpload}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileAvatar;
