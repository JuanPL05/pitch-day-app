"use strict";(()=>{var e={};e.id=577,e.ids=[577,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7830:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>p,originalPathname:()=>g,patchFetch:()=>I,requestAsyncStorage:()=>E,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>T,staticGenerationBailout:()=>N});var i={};a.r(i),a.d(i,{GET:()=>u,POST:()=>d});var o=a(5419),r=a(9108),s=a(9678),n=a(8070),c=a(9568);async function u(e){console.log("[v0] Evaluations API: GET request received");let{searchParams:t}=new URL(e.url),a=t.get("judgeId"),i=t.get("projectId");console.log("[v0] Evaluations API: Query params - judgeId:",a,"projectId:",i);try{let e=`
      SELECT 
        e.id,
        e.score,
        e."judgeId",
        e."projectId", 
        e."questionId",
        e."createdAt",
        e."updatedAt",
        j.id as judge_id,
        j.name as judge_name,
        p.id as project_id,
        p.name as project_name,
        t.id as team_id,
        t.name as team_name,
        q.id as question_id,
        q.text as question_text,
        q."order" as question_order,
        b.id as block_id,
        b.name as block_name,
        b."order" as block_order
      FROM evaluations e
      LEFT JOIN judges j ON e."judgeId" = j.id
      LEFT JOIN projects p ON e."projectId" = p.id
      LEFT JOIN teams t ON p."teamId" = t.id
      LEFT JOIN questions q ON e."questionId" = q.id
      LEFT JOIN blocks b ON q."blockId" = b.id
    `,t=[],o=[];a&&(o.push(`e."judgeId" = $${t.length+1}`),t.push(a)),i&&(o.push(`e."projectId" = $${t.length+1}`),t.push(i)),o.length>0&&(e+=` WHERE ${o.join(" AND ")}`),e+=' ORDER BY b."order" ASC, q."order" ASC',console.log("[v0] Evaluations API: Executing query with params:",t);let r=(await (0,c.executeQuery)(e,t)).map(e=>({id:e.id,score:e.score,judgeId:e.judgeId,projectId:e.projectId,questionId:e.questionId,createdAt:e.createdAt,updatedAt:e.updatedAt,judge:{id:e.judge_id,name:e.judge_name},project:{id:e.project_id,name:e.project_name,team:{id:e.team_id,name:e.team_name}},question:{id:e.question_id,text:e.question_text,order:e.question_order,block:{id:e.block_id,name:e.block_name,order:e.block_order}}}));return console.log("[v0] Evaluations API: Successfully fetched",r.length,"evaluations"),n.Z.json(r)}catch(e){return console.error("[v0] Evaluations API: Error fetching evaluations:",e),(0,c.Lb)(e,"Failed to fetch evaluations")}}async function d(e){console.log("[v0] Evaluations API: POST request received");try{let{score:t,judgeId:a,projectId:i,questionId:o}=await e.json(),r=Math.round(100*t)/100;console.log("[v0] Evaluations API: Creating/updating evaluation:",{score:r,judgeId:a,projectId:i,questionId:o});try{await (0,c.executeQuery)(`
        ALTER TABLE evaluations 
        DROP CONSTRAINT IF EXISTS evaluations_score_check
      `,[]),await (0,c.executeQuery)(`
        UPDATE evaluations 
        SET score = CASE 
          WHEN score > 5.0 THEN 5.0
          WHEN score < 1.0 THEN 1.0
          ELSE score
        END
        WHERE score > 5.0 OR score < 1.0
      `,[]),await (0,c.executeQuery)(`
        ALTER TABLE evaluations 
        ADD CONSTRAINT evaluations_score_check 
        CHECK (score >= 1.0 AND score <= 5.0)
      `,[]),console.log("[v0] Evaluations API: Updated score constraint to allow star ratings 1-5")}catch(e){console.log("[v0] Evaluations API: Constraint already updated or error:",e)}let s=`
      INSERT INTO evaluations (score, "judgeId", "projectId", "questionId", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      ON CONFLICT ("judgeId", "projectId", "questionId")
      DO UPDATE SET 
        score = EXCLUDED.score,
        "updatedAt" = NOW()
      RETURNING *
    `,u=await (0,c.executeQuery)(s,[r,a,i,o]);if(0===u.length)throw Error("Failed to create or update evaluation");let d=`
      SELECT 
        e.id,
        e.score,
        e."judgeId",
        e."projectId", 
        e."questionId",
        e."createdAt",
        e."updatedAt",
        j.id as judge_id,
        j.name as judge_name,
        p.id as project_id,
        p.name as project_name,
        q.id as question_id,
        q.text as question_text
      FROM evaluations e
      LEFT JOIN judges j ON e."judgeId" = j.id
      LEFT JOIN projects p ON e."projectId" = p.id
      LEFT JOIN questions q ON e."questionId" = q.id
      WHERE e.id = $1
    `,l=await (0,c.executeQuery)(d,[u[0].id]);if(0===l.length)throw Error("Failed to fetch created evaluation details");let E={id:l[0].id,score:l[0].score,judgeId:l[0].judgeId,projectId:l[0].projectId,questionId:l[0].questionId,createdAt:l[0].createdAt,updatedAt:l[0].updatedAt,judge:{id:l[0].judge_id,name:l[0].judge_name},project:{id:l[0].project_id,name:l[0].project_name},question:{id:l[0].question_id,text:l[0].question_text}};return console.log("[v0] Evaluations API: Successfully created/updated evaluation:",E.id),n.Z.json(E,{status:201})}catch(e){return console.error("[v0] Evaluations API: Error creating/updating evaluation:",e),(0,c.Lb)(e,"Failed to create or update evaluation")}}let l=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/evaluations/route",pathname:"/api/evaluations",filename:"route",bundlePath:"app/api/evaluations/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\evaluations\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:E,staticGenerationAsyncStorage:T,serverHooks:m,headerHooks:p,staticGenerationBailout:N}=l,g="/api/evaluations/route";function I(){return(0,s.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:T})}},9568:(e,t,a)=>{a.d(t,{Lb:()=>c,UZ:()=>u,executeQuery:()=>n,xN:()=>d});var i=a(9539);class o{async acquireConnection(){return new Promise((e,t)=>{if(this.circuitBreakerOpen){t(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){t(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let t=Date.now(),a=t-this.lastRequestTime;a<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-a):(this.lastRequestTime=t,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let r=new o,s=(0,i.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function n(e,t=[]){let a;try{await r.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let i=1;i<=3;i++)try{let a;return console.log(`[v0] Executing query (attempt ${i}):`,e.substring(0,100)+"..."),a=t.length>0?await s.query(e,t):await s.query(e,[]),r.reportSuccess(),Array.isArray(a)?a:[a]}catch(c){a=c,console.error(`[v0] Query execution failed (attempt ${i}):`,{query:e.substring(0,100)+"...",params:t,error:c.message});let o=c.message?.toLowerCase()||"",s=o.includes("too many")||o.includes("rate limit")||o.includes("unexpected token")||o.includes("invalid json")||o.includes("too many r")||o.includes("429"),n=o.includes("failed to fetch")||o.includes("connection")||o.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(s&&r.reportFailure(),i<3&&(s||n)){let e=s?1e4:2e3,t=Math.min(e*Math.pow(2,i-1),6e4);console.log(`[v0] ${s?"Rate limit detected":"Connection error"}, retrying in ${t}ms...`),await new Promise(e=>setTimeout(e,t));continue}throw c}throw a}finally{r.releaseConnection()}}function c(e,t){return(console.error(`[v0] Database error in ${t}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function u(){try{if(await n("SELECT 1 as test"),!((await n(`
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
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),i=t.X(0,[638,539,206],()=>a(7830));module.exports=i})();