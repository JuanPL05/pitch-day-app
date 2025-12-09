"use strict";(()=>{var e={};e.id=695,e.ids=[695,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4491:(e,t,i)=>{i.r(t),i.d(t,{headerHooks:()=>p,originalPathname:()=>N,patchFetch:()=>g,requestAsyncStorage:()=>E,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>T,staticGenerationBailout:()=>h});var a={};i.r(a),i.d(a,{DELETE:()=>l,PUT:()=>u});var o=i(5419),s=i(9108),n=i(9678),r=i(8070),c=i(9568);async function u(e,{params:t}){try{let{text:i,description:a,blockId:o,programId:s,order:n,score:u}=await e.json();console.log("[v0] Updating question:",t.id,{text:i,description:a,blockId:o,programId:s,order:n,score:u}),console.log("[v0] Score value type and range check:",typeof u,u,"within 0.2-1.0:",u>=.2&&u<=1);let l=`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'questions' AND table_schema = 'public'
    `,d=(await (0,c.executeQuery)(l,[])).map(e=>e.column_name);console.log("[v0] Available columns:",d);let E=d.includes("description"),T=d.includes("programId"),m=d.includes("score");console.log("[v0] Column flags:",{hasDescription:E,hasProgramId:T,hasScore:m});let p=[],h=[],N=1;p.push(`text = $${N}`),h.push(i),N++,E&&(p.push(`description = $${N}`),h.push(a||null),N++),m&&(p.push(`score = $${N}`),h.push(u||.5),N++),p.push(`"blockId" = $${N}`),h.push(o),N++,T&&(p.push(`"programId" = $${N}`),h.push(s),N++),p.push(`"order" = $${N}`),h.push(n),N++,p.push('"updatedAt" = NOW()'),h.push(t.id);let g=`
      UPDATE questions 
      SET ${p.join(", ")}
      WHERE id = $${N}
      RETURNING *
    `;console.log("[v0] Executing update query:",g),console.log("[v0] Query parameters:",h);let b=await (0,c.executeQuery)(g,h);if(console.log("[v0] Update result:",b.length>0?"Success":"No rows affected",b.length>0?b[0]:"No data"),0===b.length)return r.Z.json({error:"Question not found"},{status:404});let O=b[0],f=(await (0,c.executeQuery)("SELECT id, name FROM blocks WHERE id = $1",[o]))[0],_={...O,block:f?{id:f.id,name:f.name}:null};if(T&&s){let e=(await (0,c.executeQuery)("SELECT id, name FROM programs WHERE id = $1",[s]))[0];_.program=e?{id:e.id,name:e.name}:null}return console.log("[v0] Question updated successfully:",_.id),r.Z.json(_)}catch(e){return console.error("[v0] Error updating question:",e),(0,c.Lb)(e,"Failed to update question")}}async function l(e,{params:t}){try{console.log("[v0] Deleting question:",t.id);let e=await (0,c.executeQuery)("SELECT id, text FROM questions WHERE id = $1",[t.id]);if(console.log("[v0] Question exists check:",e.length>0?"Found":"Not found",e.length>0?e[0]:"No data"),0===e.length)return console.log("[v0] Question not found for deletion:",t.id),r.Z.json({error:"Question not found"},{status:404});let i="DELETE FROM questions WHERE id = $1 RETURNING id";console.log("[v0] Executing delete query:",i,"with param:",t.id);let a=await (0,c.executeQuery)(i,[t.id]);if(console.log("[v0] Delete result:",a.length>0?"Success":"No rows affected",a.length>0?a[0]:"No data"),0===a.length)return r.Z.json({error:"Question could not be deleted"},{status:500});return console.log("[v0] Question deleted successfully:",t.id),r.Z.json({message:"Question deleted successfully"})}catch(e){return console.error("[v0] Error deleting question:",e),(0,c.Lb)(e,"Failed to delete question")}}let d=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/questions/[id]/route",pathname:"/api/questions/[id]",filename:"route",bundlePath:"app/api/questions/[id]/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\questions\\[id]\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:E,staticGenerationAsyncStorage:T,serverHooks:m,headerHooks:p,staticGenerationBailout:h}=d,N="/api/questions/[id]/route";function g(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:T})}},9568:(e,t,i)=>{i.d(t,{Lb:()=>c,UZ:()=>u,executeQuery:()=>r,xN:()=>l});var a=i(9539);class o{async acquireConnection(){return new Promise((e,t)=>{if(this.circuitBreakerOpen){t(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){t(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let t=Date.now(),i=t-this.lastRequestTime;i<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-i):(this.lastRequestTime=t,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let s=new o,n=(0,a.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function r(e,t=[]){let i;try{await s.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let a=1;a<=3;a++)try{let i;return console.log(`[v0] Executing query (attempt ${a}):`,e.substring(0,100)+"..."),i=t.length>0?await n.query(e,t):await n.query(e,[]),s.reportSuccess(),Array.isArray(i)?i:[i]}catch(c){i=c,console.error(`[v0] Query execution failed (attempt ${a}):`,{query:e.substring(0,100)+"...",params:t,error:c.message});let o=c.message?.toLowerCase()||"",n=o.includes("too many")||o.includes("rate limit")||o.includes("unexpected token")||o.includes("invalid json")||o.includes("too many r")||o.includes("429"),r=o.includes("failed to fetch")||o.includes("connection")||o.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(n&&s.reportFailure(),a<3&&(n||r)){let e=n?1e4:2e3,t=Math.min(e*Math.pow(2,a-1),6e4);console.log(`[v0] ${n?"Rate limit detected":"Connection error"}, retrying in ${t}ms...`),await new Promise(e=>setTimeout(e,t));continue}throw c}throw i}finally{s.releaseConnection()}}function c(e,t){return(console.error(`[v0] Database error in ${t}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function u(){try{if(await r("SELECT 1 as test"),!((await r(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await r("SELECT COUNT(*) as count FROM programs"),t=e[0]?.count>0;return{database:!0,tables:!0,data:t}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function l(){try{return console.log("[v0] Initializing database..."),await n.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        block_id TEXT NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS judges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await n.query(`
      CREATE TABLE IF NOT EXISTS evaluations (
        id SERIAL PRIMARY KEY,
        score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
        judge_id TEXT NOT NULL REFERENCES judges(id) ON DELETE CASCADE,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(judge_id, project_id, question_id)
      )
    `),console.log("[v0] Tables created successfully"),await n.query(`
      INSERT INTO programs (id, name, description) VALUES 
      ('prog_incubation', 'Programa de Incubaci\xf3n', 'Programa para startups en etapa temprana'),
      ('prog_acceleration', 'Programa de Aceleraci\xf3n', 'Programa para startups en crecimiento')
      ON CONFLICT (id) DO NOTHING
    `),await n.query(`
      INSERT INTO blocks (id, name, description, "order") VALUES 
      ('block_innovation', 'Innovaci\xf3n', 'Evaluaci\xf3n de la innovaci\xf3n del proyecto', 1),
      ('block_market', 'Mercado', 'An\xe1lisis del mercado y oportunidad', 2),
      ('block_team', 'Equipo', 'Evaluaci\xf3n del equipo fundador', 3),
      ('block_business', 'Modelo de Negocio', 'Viabilidad del modelo de negocio', 4),
      ('block_financial', 'Financiero', 'Proyecciones y viabilidad financiera', 5)
      ON CONFLICT (id) DO NOTHING
    `),await n.query(`
      INSERT INTO questions (id, text, block_id, "order") VALUES 
      ('q_innovation_1', '\xbfQu\xe9 tan innovadora es la soluci\xf3n propuesta?', 'block_innovation', 1),
      ('q_innovation_2', '\xbfEl proyecto resuelve un problema real y significativo?', 'block_innovation', 2),
      ('q_market_1', '\xbfQu\xe9 tan grande es el mercado objetivo?', 'block_market', 1),
      ('q_market_2', '\xbfEl equipo comprende bien su mercado?', 'block_market', 2),
      ('q_team_1', '\xbfEl equipo tiene las competencias necesarias?', 'block_team', 1),
      ('q_team_2', '\xbfQu\xe9 tan comprometido est\xe1 el equipo?', 'block_team', 2),
      ('q_business_1', '\xbfEl modelo de negocio es claro y viable?', 'block_business', 1),
      ('q_business_2', '\xbfLas fuentes de ingresos est\xe1n bien definidas?', 'block_business', 2),
      ('q_financial_1', '\xbfLas proyecciones financieras son realistas?', 'block_financial', 1),
      ('q_financial_2', '\xbfEl proyecto tiene potencial de escalabilidad?', 'block_financial', 2)
      ON CONFLICT (id) DO NOTHING
    `),await n.query(`
      INSERT INTO teams (id, name, description) VALUES 
      ('team_techstars', 'TechStars', 'Startup de tecnolog\xeda educativa'),
      ('team_greentech', 'GreenTech Solutions', 'Soluciones tecnol\xf3gicas sostenibles'),
      ('team_healthai', 'HealthAI', 'Inteligencia artificial para salud')
      ON CONFLICT (id) DO NOTHING
    `),await n.query(`
      INSERT INTO projects (id, name, description, program_id, team_id) VALUES 
      ('proj_edutech', 'EduTech Platform', 'Plataforma de aprendizaje personalizado con IA', 'prog_incubation', 'team_techstars'),
      ('proj_carbon', 'Carbon Tracker', 'Sistema de monitoreo de huella de carbono empresarial', 'prog_acceleration', 'team_greentech'),
      ('proj_diagnosis', 'AI Diagnosis', 'Diagn\xf3stico m\xe9dico asistido por inteligencia artificial', 'prog_incubation', 'team_healthai')
      ON CONFLICT (id) DO NOTHING
    `),await n.query(`
      INSERT INTO judges (id, name, email, token) VALUES 
      ('judge_maria', 'Mar\xeda Gonz\xe1lez', 'maria@judges.com', 'token_maria_123'),
      ('judge_carlos', 'Carlos Rodr\xedguez', 'carlos@judges.com', 'token_carlos_456')
      ON CONFLICT (id) DO NOTHING
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),a=t.X(0,[638,539,206],()=>i(4491));module.exports=a})();