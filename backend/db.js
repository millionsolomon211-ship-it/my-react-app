import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',         
  database: 'auth_db',        
  password: '1q2w3e4r5t',   
  port: 5432,                 
});


//pool.on('connect', () => {
 // console.log('✅ Connected to the PostgreSQL database successfully!');
//});


pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle database client', err);
  process.exit(-1);
});


export default pool;