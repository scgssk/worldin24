
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { City } from '../data/cities';

interface TimeCapsuleProps {
  city: City | null;
}

interface TimeCapsuleMessage {
  id: string;
  city: string;
  author: string;
  message: string;
  timestamp: Date;
}

const TimeCapsule = ({ city }: TimeCapsuleProps) => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<TimeCapsuleMessage[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || !message.trim() || !city) return;
    
    const newMessage: TimeCapsuleMessage = {
      id: Date.now().toString(),
      city: city.name,
      author,
      message,
      timestamp: new Date()
    };
    
    setMessages([newMessage, ...messages]);
    setMessage('');
  };
  
  const filteredMessages = city 
    ? messages.filter(msg => msg.city === city.name)
    : messages;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Time Capsule
          {city && <span className="ml-2 text-muted-foreground">- {city.name}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="author">Your Name</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Who are you?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Share a thought, story, or message about ${city?.name || 'this place'}...`}
              className="min-h-[100px]"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!city || !author.trim() || !message.trim()}
          >
            Leave Your Mark
          </Button>
        </form>
        
        <div className="mt-8 space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">{msg.author}</h4>
                  <span className="text-sm text-muted-foreground">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line">{msg.message}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              Be the first to leave a message here!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeCapsule;
