"use strict";(()=>{var e={};e.id=330,e.ids=[330,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},921:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>p,originalPathname:()=>b,patchFetch:()=>q,requestAsyncStorage:()=>m,routeModule:()=>d,serverHooks:()=>T,staticGenerationAsyncStorage:()=>E,staticGenerationBailout:()=>N});var i={};a.r(i),a.d(i,{GET:()=>u,POST:()=>l});var o=a(5419),r=a(9108),n=a(9678),s=a(8070),c=a(9568);async function u(){try{console.log("[v0] Fetching questions with blocks and programs...");let e=!1,t=!1,a=!1;try{e=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'programId'
      `)).length>0,t=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'description'
      `)).length>0,a=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'score'
      `)).length>0}catch(e){console.log("[v0] Column check failed, using fallback query")}let i="";i=e&&t&&a?`
        SELECT 
          q.id,
          q.text,
          q.description,
          q.score,
          q."blockId",
          q."programId",
          q."order",
          q."createdAt",
          q."updatedAt",
          b.id as block_id,
          b.name as block_name,
          p.id as program_id,
          p.name as program_name
        FROM questions q
        LEFT JOIN blocks b ON q."blockId" = b.id
        LEFT JOIN programs p ON q."programId" = p.id
        ORDER BY p.name ASC, b."order" ASC, q."order" ASC
      `:e&&t?`
        SELECT 
          q.id,
          q.text,
          q.description,
          q."blockId",
          q."programId",
          q."order",
          q."createdAt",
          q."updatedAt",
          b.id as block_id,
          b.name as block_name,
          p.id as program_id,
          p.name as program_name
        FROM questions q
        LEFT JOIN blocks b ON q."blockId" = b.id
        LEFT JOIN programs p ON q."programId" = p.id
        ORDER BY p.name ASC, b."order" ASC, q."order" ASC
      `:t?`
        SELECT 
          q.id,
          q.text,
          q.description,
          q."blockId",
          q."order",
          q."createdAt",
          q."updatedAt",
          b.id as block_id,
          b.name as block_name
        FROM questions q
        LEFT JOIN blocks b ON q."blockId" = b.id
        ORDER BY b."order" ASC, q."order" ASC
      `:`
        SELECT 
          q.id,
          q.text,
          q."blockId",
          q."order",
          q."createdAt",
          q."updatedAt",
          b.id as block_id,
          b.name as block_name
        FROM questions q
        LEFT JOIN blocks b ON q."blockId" = b.id
        ORDER BY b."order" ASC, q."order" ASC
      `;let o=(await (0,c.executeQuery)(i)).map(i=>({id:i.id,text:i.text,description:t&&i.description||null,score:a&&i.score||.5,blockId:i.blockId,programId:e&&i.programId||null,order:i.order,createdAt:i.createdAt,updatedAt:i.updatedAt,block:i.block_id?{id:i.block_id,name:i.block_name}:null,program:e&&i.program_id?{id:i.program_id,name:i.program_name}:null}));return console.log("[v0] Questions fetched successfully:",o.length),s.Z.json(o)}catch(e){return console.error("[v0] Error fetching questions:",e),(0,c.Lb)(e,"Failed to fetch questions")}}async function l(e){try{let{text:t,description:a,blockId:i,programId:o,order:r,score:n}=await e.json();console.log("[v0] Creating question:",{text:t,description:a,blockId:i,programId:o,order:r,score:n});let u=!1,l=!1,d=!1;try{u=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'programId'
      `)).length>0,l=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'description'
      `)).length>0,d=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'score'
      `)).length>0}catch(e){console.log("[v0] Column check failed, using fallback")}let m="",E=[];u&&l&&d?(m=`
        INSERT INTO questions (text, description, score, "blockId", "programId", "order", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        RETURNING *
      `,E=[t,a||null,n||.5,i,o,r]):u&&l?(m=`
        INSERT INTO questions (text, description, "blockId", "programId", "order", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *
      `,E=[t,a||null,i,o,r]):l?(m=`
        INSERT INTO questions (text, description, "blockId", "order", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *
      `,E=[t,a||null,i,r]):u?(m=`
        INSERT INTO questions (text, "blockId", "programId", "order", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *
      `,E=[t,i,o,r]):(m=`
        INSERT INTO questions (text, "blockId", "order", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING *
      `,E=[t,i,r]);let T=(await (0,c.executeQuery)(m,E))[0],p=(await (0,c.executeQuery)("SELECT id, name FROM blocks WHERE id = $1",[i]))[0],N=null;u&&o&&(N=(await (0,c.executeQuery)("SELECT id, name FROM programs WHERE id = $1",[o]))[0]);let b={...T,description:l?T.description:null,score:d?T.score:n||.5,programId:u?T.programId:null,block:{id:p.id,name:p.name},program:N?{id:N.id,name:N.name}:null};return console.log("[v0] Question created successfully:",b.id),s.Z.json(b,{status:201})}catch(e){return console.error("[v0] Error creating question:",e),(0,c.Lb)(e,"Failed to create question")}}let d=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/questions/route",pathname:"/api/questions",filename:"route",bundlePath:"app/api/questions/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\questions\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:E,serverHooks:T,headerHooks:p,staticGenerationBailout:N}=d,b="/api/questions/route";function q(){return(0,n.patchFetch)({serverHooks:T,staticGenerationAsyncStorage:E})}},9568:(e,t,a)=>{a.d(t,{Lb:()=>c,UZ:()=>u,executeQuery:()=>s,xN:()=>l});var i=a(9539);class o{async acquireConnection(){return new Promise((e,t)=>{if(this.circuitBreakerOpen){t(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){t(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let t=Date.now(),a=t-this.lastRequestTime;a<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-a):(this.lastRequestTime=t,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let r=new o,n=(0,i.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function s(e,t=[]){let a;try{await r.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let i=1;i<=3;i++)try{let a;return console.log(`[v0] Executing query (attempt ${i}):`,e.substring(0,100)+"..."),a=t.length>0?await n.query(e,t):await n.query(e,[]),r.reportSuccess(),Array.isArray(a)?a:[a]}catch(c){a=c,console.error(`[v0] Query execution failed (attempt ${i}):`,{query:e.substring(0,100)+"...",params:t,error:c.message});let o=c.message?.toLowerCase()||"",n=o.includes("too many")||o.includes("rate limit")||o.includes("unexpected token")||o.includes("invalid json")||o.includes("too many r")||o.includes("429"),s=o.includes("failed to fetch")||o.includes("connection")||o.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(n&&r.reportFailure(),i<3&&(n||s)){let e=n?1e4:2e3,t=Math.min(e*Math.pow(2,i-1),6e4);console.log(`[v0] ${n?"Rate limit detected":"Connection error"}, retrying in ${t}ms...`),await new Promise(e=>setTimeout(e,t));continue}throw c}throw a}finally{r.releaseConnection()}}function c(e,t){return(console.error(`[v0] Database error in ${t}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function u(){try{if(await s("SELECT 1 as test"),!((await s(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await s("SELECT COUNT(*) as count FROM programs"),t=e[0]?.count>0;return{database:!0,tables:!0,data:t}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function l(){try{return console.log("[v0] Initializing database..."),await n.query(`
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
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[638,539,206],()=>a(921));module.exports=i})();