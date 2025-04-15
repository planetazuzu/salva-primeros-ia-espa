
import React from 'react';
import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Brain, Bot, Server, Cpu } from 'lucide-react';
import { AIMode } from '../types';

interface ModelOptionProps {
  value: AIMode;
  title: string;
  description: string;
  icon: 'bot' | 'brain' | 'server' | 'cpu';
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
}

const ModelOption: React.FC<ModelOptionProps> = ({
  value,
  title,
  description,
  icon,
  badge
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'bot':
        return <Bot className="mr-2 h-5 w-5" />;
      case 'brain':
        return <Brain className="mr-2 h-5 w-5" />;
      case 'server':
        return <Server className="mr-2 h-5 w-5" />;
      case 'cpu':
        return <Cpu className="mr-2 h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className="font-normal flex-1 flex items-center">
        {renderIcon()}
        <div>
          <div>{title}</div>
          <div className="text-xs text-muted-foreground">
            {description}
          </div>
        </div>
      </FormLabel>
      {badge && (
        <Badge 
          variant={badge.variant || "outline"} 
          className={badge.className}
        >
          {badge.text}
        </Badge>
      )}
    </FormItem>
  );
};

export default ModelOption;
