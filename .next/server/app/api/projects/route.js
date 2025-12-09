"use strict";(()=>{var e={};e.id=871,e.ids=[871,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2419:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>p,originalPathname:()=>g,patchFetch:()=>h,requestAsyncStorage:()=>E,routeModule:()=>l,serverHooks:()=>T,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>N});var i={};a.r(i),a.d(i,{GET:()=>u,POST:()=>d});var r=a(5419),o=a(9108),s=a(9678),n=a(8070),c=a(9568);async function u(){try{console.log("[v0] Fetching projects with programs and teams...");let e=`
      SELECT 
        p.id,
        p.name,
        p.description,
        p."programId",
        p."teamId",
        p."createdAt",
        p."updatedAt",
        pr.id as program_id,
        pr.name as program_name,
        t.id as team_id,
        t.name as team_name
      FROM projects p
      LEFT JOIN programs pr ON p."programId" = pr.id
      LEFT JOIN teams t ON p."teamId" = t.id
      ORDER BY p."createdAt" DESC
    `,t=(await (0,c.executeQuery)(e)).map(e=>({id:e.id,name:e.name,description:e.description,programId:e.programId,teamId:e.teamId,createdAt:e.createdAt,updatedAt:e.updatedAt,program:{id:e.program_id,name:e.program_name},team:{id:e.team_id,name:e.team_name}}));return console.log("[v0] Projects fetched successfully:",t.length),n.Z.json(t)}catch(e){return console.error("[v0] Error fetching projects:",e),(0,c.Lb)(e,"Failed to fetch projects")}}async function d(e){try{let{name:t,description:a,programId:i,teamId:r}=await e.json();console.log("[v0] Creating project:",{name:t,description:a,programId:i,teamId:r});let o=`
      INSERT INTO projects (name, description, "programId", "teamId", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *
    `,s=(await (0,c.executeQuery)(o,[t,a,i,r]))[0],[u,d]=await Promise.all([(0,c.executeQuery)("SELECT id, name FROM programs WHERE id = $1",[i]),(0,c.executeQuery)("SELECT id, name FROM teams WHERE id = $1",[r])]),l={...s,program:{id:u[0]?.id,name:u[0]?.name},team:{id:d[0]?.id,name:d[0]?.name}};return console.log("[v0] Project created successfully:",l.id),n.Z.json(l,{status:201})}catch(e){return console.error("[v0] Error creating project:",e),(0,c.Lb)(e,"Failed to create project")}}let l=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/projects/route",pathname:"/api/projects",filename:"route",bundlePath:"app/api/projects/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\projects\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:E,staticGenerationAsyncStorage:m,serverHooks:T,headerHooks:p,staticGenerationBailout:N}=l,g="/api/projects/route";function h(){return(0,s.patchFetch)({serverHooks:T,staticGenerationAsyncStorage:m})}},9568:(e,t,a)=>{a.d(t,{Lb:()=>c,UZ:()=>u,executeQuery:()=>n,xN:()=>d});var i=a(9539);class r{async acquireConnection(){return new Promise((e,t)=>{if(this.circuitBreakerOpen){t(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){t(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let t=Date.now(),a=t-this.lastRequestTime;a<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-a):(this.lastRequestTime=t,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let o=new r,s=(0,i.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function n(e,t=[]){let a;try{await o.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let i=1;i<=3;i++)try{let a;return console.log(`[v0] Executing query (attempt ${i}):`,e.substring(0,100)+"..."),a=t.length>0?await s.query(e,t):await s.query(e,[]),o.reportSuccess(),Array.isArray(a)?a:[a]}catch(c){a=c,console.error(`[v0] Query execution failed (attempt ${i}):`,{query:e.substring(0,100)+"...",params:t,error:c.message});let r=c.message?.toLowerCase()||"",s=r.includes("too many")||r.includes("rate limit")||r.includes("unexpected token")||r.includes("invalid json")||r.includes("too many r")||r.includes("429"),n=r.includes("failed to fetch")||r.includes("connection")||r.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(s&&o.reportFailure(),i<3&&(s||n)){let e=s?1e4:2e3,t=Math.min(e*Math.pow(2,i-1),6e4);console.log(`[v0] ${s?"Rate limit detected":"Connection error"}, retrying in ${t}ms...`),await new Promise(e=>setTimeout(e,t));continue}throw c}throw a}finally{o.releaseConnection()}}function c(e,t){return(console.error(`[v0] Database error in ${t}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function u(){try{if(await n("SELECT 1 as test"),!((await n(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await n("SELECT COUNT(*) as count FROM programs"),t=e[0]?.count>0;return{database:!0,tables:!0,data:t}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function d(){try{return console.log("[v0] Initializing database..."),await s.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        block_id TEXT NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS judges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await s.query(`
      CREATE TABLE IF NOT EXISTS evaluations (
        id SERIAL PRIMARY KEY,
        score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
        judge_id TEXT NOT NULL REFERENCES judges(id) ON DELETE CASCADE,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(judge_id, project_id, question_id)
      )
    `),console.log("[v0] Tables created successfully"),await s.query(`
      INSERT INTO programs (id, name, description) VALUES 
      ('prog_incubation', 'Programa de Incubaci\xf3n', 'Programa para startups en etapa temprana'),
      ('prog_acceleration', 'Programa de Aceleraci\xf3n', 'Programa para startups en crecimiento')
      ON CONFLICT (id) DO NOTHING
    `),await s.query(`
      INSERT INTO blocks (id, name, description, "order") VALUES 
      ('block_innovation', 'Innovaci\xf3n', 'Evaluaci\xf3n de la innovaci\xf3n del proyecto', 1),
      ('block_market', 'Mercado', 'An\xe1lisis del mercado y oportunidad', 2),
      ('block_team', 'Equipo', 'Evaluaci\xf3n del equipo fundador', 3),
      ('block_business', 'Modelo de Negocio', 'Viabilidad del modelo de negocio', 4),
      ('block_financial', 'Financiero', 'Proyecciones y viabilidad financiera', 5)
      ON CONFLICT (id) DO NOTHING
    `),await s.query(`
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
    `),await s.query(`
      INSERT INTO teams (id, name, description) VALUES 
      ('team_techstars', 'TechStars', 'Startup de tecnolog\xeda educativa'),
      ('team_greentech', 'GreenTech Solutions', 'Soluciones tecnol\xf3gicas sostenibles'),
      ('team_healthai', 'HealthAI', 'Inteligencia artificial para salud')
      ON CONFLICT (id) DO NOTHING
    `),await s.query(`
      INSERT INTO projects (id, name, description, program_id, team_id) VALUES 
      ('proj_edutech', 'EduTech Platform', 'Plataforma de aprendizaje personalizado con IA', 'prog_incubation', 'team_techstars'),
      ('proj_carbon', 'Carbon Tracker', 'Sistema de monitoreo de huella de carbono empresarial', 'prog_acceleration', 'team_greentech'),
      ('proj_diagnosis', 'AI Diagnosis', 'Diagn\xf3stico m\xe9dico asistido por inteligencia artificial', 'prog_incubation', 'team_healthai')
      ON CONFLICT (id) DO NOTHING
    `),await s.query(`
      INSERT INTO judges (id, name, email, token) VALUES 
      ('judge_maria', 'Mar\xeda Gonz\xe1lez', 'maria@judges.com', 'token_maria_123'),
      ('judge_carlos', 'Carlos Rodr\xedguez', 'carlos@judges.com', 'token_carlos_456')
      ON CONFLICT (id) DO NOTHING
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[638,539,206],()=>a(2419));module.exports=i})();