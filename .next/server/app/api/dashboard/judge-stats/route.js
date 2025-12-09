"use strict";(()=>{var e={};e.id=640,e.ids=[640,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2345:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>m,originalPathname:()=>N,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>E,staticGenerationAsyncStorage:()=>T,staticGenerationBailout:()=>p});var i={};a.r(i),a.d(i,{GET:()=>u});var s=a(5419),o=a(9108),r=a(9678),n=a(8070),c=a(9568);async function u(){try{console.log("[v0] Judge Stats API: Starting judge stats calculation");let e=await (0,c.executeQuery)("SELECT COUNT(*) as count FROM projects"),t=Number.parseInt(e[0].count),a=`
      SELECT 
        p.name as program_name,
        COUNT(q.id) as question_count
      FROM programs p
      LEFT JOIN questions q ON p.id = q."programId"
      GROUP BY p.id, p.name
    `;await (0,c.executeQuery)(a);let i=`
      SELECT 
        j.id as judge_id,
        j.name as judge_name,
        COUNT(DISTINCT e."projectId") as projects_evaluated,
        COUNT(e.id) as total_evaluations
      FROM judges j
      LEFT JOIN evaluations e ON j.id = e."judgeId"
      GROUP BY j.id, j.name
    `,s=await (0,c.executeQuery)(i),o=await (0,c.executeQuery)("SELECT COUNT(*) as count FROM questions"),r=Number.parseInt(o[0].count),u=t*r,l=s.filter(e=>{let a=e.projects_evaluated===t,i=e.total_evaluations===u;return a&&i}).length,d={totalJudges:s.length,completedJudges:l,totalProjects:t,totalQuestions:r,maxPossibleEvaluations:u};return console.log("[v0] Judge Stats API: Stats calculated:",d),n.Z.json(d)}catch(e){return console.error("[v0] Judge Stats error:",e),(0,c.Lb)(e,"Failed to fetch judge statistics")}}let l=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/dashboard/judge-stats/route",pathname:"/api/dashboard/judge-stats",filename:"route",bundlePath:"app/api/dashboard/judge-stats/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\dashboard\\judge-stats\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:d,staticGenerationAsyncStorage:T,serverHooks:E,headerHooks:m,staticGenerationBailout:p}=l,N="/api/dashboard/judge-stats/route";function g(){return(0,r.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:T})}},9568:(e,t,a)=>{a.d(t,{Lb:()=>c,UZ:()=>u,executeQuery:()=>n,xN:()=>l});var i=a(9539);class s{async acquireConnection(){return new Promise((e,t)=>{if(this.circuitBreakerOpen){t(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){t(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let t=Date.now(),a=t-this.lastRequestTime;a<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-a):(this.lastRequestTime=t,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let o=new s,r=(0,i.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function n(e,t=[]){let a;try{await o.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let i=1;i<=3;i++)try{let a;return console.log(`[v0] Executing query (attempt ${i}):`,e.substring(0,100)+"..."),a=t.length>0?await r.query(e,t):await r.query(e,[]),o.reportSuccess(),Array.isArray(a)?a:[a]}catch(c){a=c,console.error(`[v0] Query execution failed (attempt ${i}):`,{query:e.substring(0,100)+"...",params:t,error:c.message});let s=c.message?.toLowerCase()||"",r=s.includes("too many")||s.includes("rate limit")||s.includes("unexpected token")||s.includes("invalid json")||s.includes("too many r")||s.includes("429"),n=s.includes("failed to fetch")||s.includes("connection")||s.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(r&&o.reportFailure(),i<3&&(r||n)){let e=r?1e4:2e3,t=Math.min(e*Math.pow(2,i-1),6e4);console.log(`[v0] ${r?"Rate limit detected":"Connection error"}, retrying in ${t}ms...`),await new Promise(e=>setTimeout(e,t));continue}throw c}throw a}finally{o.releaseConnection()}}function c(e,t){return(console.error(`[v0] Database error in ${t}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function u(){try{if(await n("SELECT 1 as test"),!((await n(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await n("SELECT COUNT(*) as count FROM programs"),t=e[0]?.count>0;return{database:!0,tables:!0,data:t}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function l(){try{return console.log("[v0] Initializing database..."),await r.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS blocks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        block_id TEXT NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS judges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `),await r.query(`
      CREATE TABLE IF NOT EXISTS evaluations (
        id SERIAL PRIMARY KEY,
        score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
        judge_id TEXT NOT NULL REFERENCES judges(id) ON DELETE CASCADE,
        project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(judge_id, project_id, question_id)
      )
    `),console.log("[v0] Tables created successfully"),await r.query(`
      INSERT INTO programs (id, name, description) VALUES 
      ('prog_incubation', 'Programa de Incubaci\xf3n', 'Programa para startups en etapa temprana'),
      ('prog_acceleration', 'Programa de Aceleraci\xf3n', 'Programa para startups en crecimiento')
      ON CONFLICT (id) DO NOTHING
    `),await r.query(`
      INSERT INTO blocks (id, name, description, "order") VALUES 
      ('block_innovation', 'Innovaci\xf3n', 'Evaluaci\xf3n de la innovaci\xf3n del proyecto', 1),
      ('block_market', 'Mercado', 'An\xe1lisis del mercado y oportunidad', 2),
      ('block_team', 'Equipo', 'Evaluaci\xf3n del equipo fundador', 3),
      ('block_business', 'Modelo de Negocio', 'Viabilidad del modelo de negocio', 4),
      ('block_financial', 'Financiero', 'Proyecciones y viabilidad financiera', 5)
      ON CONFLICT (id) DO NOTHING
    `),await r.query(`
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
    `),await r.query(`
      INSERT INTO teams (id, name, description) VALUES 
      ('team_techstars', 'TechStars', 'Startup de tecnolog\xeda educativa'),
      ('team_greentech', 'GreenTech Solutions', 'Soluciones tecnol\xf3gicas sostenibles'),
      ('team_healthai', 'HealthAI', 'Inteligencia artificial para salud')
      ON CONFLICT (id) DO NOTHING
    `),await r.query(`
      INSERT INTO projects (id, name, description, program_id, team_id) VALUES 
      ('proj_edutech', 'EduTech Platform', 'Plataforma de aprendizaje personalizado con IA', 'prog_incubation', 'team_techstars'),
      ('proj_carbon', 'Carbon Tracker', 'Sistema de monitoreo de huella de carbono empresarial', 'prog_acceleration', 'team_greentech'),
      ('proj_diagnosis', 'AI Diagnosis', 'Diagn\xf3stico m\xe9dico asistido por inteligencia artificial', 'prog_incubation', 'team_healthai')
      ON CONFLICT (id) DO NOTHING
    `),await r.query(`
      INSERT INTO judges (id, name, email, token) VALUES 
      ('judge_maria', 'Mar\xeda Gonz\xe1lez', 'maria@judges.com', 'token_maria_123'),
      ('judge_carlos', 'Carlos Rodr\xedguez', 'carlos@judges.com', 'token_carlos_456')
      ON CONFLICT (id) DO NOTHING
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[638,539,206],()=>a(2345));module.exports=i})();