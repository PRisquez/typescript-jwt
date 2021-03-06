import express, {Application} from 'express';
import morgan from 'morgan';
import AuthRoutes from './routes/auth.routes';

export class App {
    private app: Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
      }

    private middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }
    
    private routes() {
        this.app.use('/api/auth',AuthRoutes);
    }

    async listen () {
        await this.app.listen(this.app.get("port"));
        console.log('Server on port',this.app.get("port"));
        
    }
}