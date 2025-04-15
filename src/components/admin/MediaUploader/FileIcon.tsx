
import { Image, Video, FileText, Film, File } from 'lucide-react';

interface FileIconProps {
  type: string;
  className?: string;
}

const FileIcon = ({ type, className = "h-5 w-5 text-auxilio-azul" }: FileIconProps) => {
  switch (type) {
    case 'image':
      return <Image className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'document':
      return <FileText className={className} />;
    case 'presentation':
      return <Film className={className} />;
    default:
      return <File className={className} />;
  }
};

export default FileIcon;
