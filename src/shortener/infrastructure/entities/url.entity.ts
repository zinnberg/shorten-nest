import { 
    Entity, 
    Column, 
    PrimaryColumn, 
} from 'typeorm';

@Entity({ schema: 'shortener', name: 'urls' })
export class UrlEntity {
  @PrimaryColumn()
  shortenedUrl: string;
  
  @Column({ nullable: false })
  originalUrl: string;
  
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;
}