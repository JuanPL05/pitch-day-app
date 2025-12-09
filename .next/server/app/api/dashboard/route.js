"use strict";(()=>{var e={};e.id=707,e.ids=[707,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3709:(e,a,t)=>{t.r(a),t.d(a,{headerHooks:()=>T,originalPathname:()=>p,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>E,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>N});var o={};t.r(o),t.d(o,{GET:()=>l});var r=t(5419),i=t(9108),s=t(9678),n=t(8070),c=t(9568);async function l(){try{let e;console.log("[v0] Dashboard API: Starting data fetch");let a=await (0,c.executeQuery)("SELECT COUNT(*) as count FROM evaluations"),t=Number.parseInt(a[0].count);console.log("[v0] Dashboard API: Total evaluations in database:",t);let o=!1;try{o=(await (0,c.executeQuery)(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'questions' AND column_name = 'score'
      `)).length>0,console.log("[v0] Dashboard API: Questions have score column:",o)}catch(e){console.log("[v0] Dashboard API: Column check failed, using fallback")}let r=`
      SELECT 
        p.id,
        p.name,
        p.description,
        p."programId",
        p."teamId",
        prog.name as "programName",
        t.name as "teamName",
        t.description as "teamDescription"
      FROM projects p
      LEFT JOIN programs prog ON p."programId" = prog.id
      LEFT JOIN teams t ON p."teamId" = t.id
      ORDER BY p."createdAt" DESC
    `,i=await (0,c.executeQuery)(r),s=await (0,c.executeQuery)("SELECT COUNT(*) as count FROM judges"),l=Number.parseInt(s[0].count);console.log("[v0] Dashboard API: Found",i.length,"projects");let u="";u=o?`
        SELECT 
          e.score,
          e."projectId",
          e."questionId",
          e."judgeId",
          q.text as "questionText",
          q.score as "questionMaxScore",
          q."blockId",
          b.name as "blockName",
          b.id as "blockIdCheck"
        FROM evaluations e
        INNER JOIN questions q ON e."questionId" = q.id
        INNER JOIN blocks b ON q."blockId" = b.id
        WHERE e.score IS NOT NULL AND q.id IS NOT NULL AND b.id IS NOT NULL
      `:`
        SELECT 
          e.score,
          e."projectId",
          e."questionId",
          e."judgeId",
          q.text as "questionText",
          q."blockId",
          b.name as "blockName",
          b.id as "blockIdCheck"
        FROM evaluations e
        INNER JOIN questions q ON e."questionId" = q.id
        INNER JOIN blocks b ON q."blockId" = b.id
        WHERE e.score IS NOT NULL AND q.id IS NOT NULL AND b.id IS NOT NULL
      `;let d=await (0,c.executeQuery)(u);console.log("[v0] Dashboard API: Found",d.length,"evaluations with valid joins"),d.length>0&&(console.log("[v0] Sample evaluation data:"),d.slice(0,3).forEach((e,a)=>{console.log(`[v0] Eval ${a}: projectId=${e.projectId}, score=${e.score}, blockName="${e.blockName}", blockId=${e.blockIdCheck}`)}));let m="";o?m=`
        SELECT 
          prog.name as "programName",
          SUM(q.score) as "maxScore",
          COUNT(q.id) as "questionCount"
        FROM questions q
        LEFT JOIN programs prog ON q."programId" = prog.id
        GROUP BY prog.id, prog.name
      `:e=await (0,c.executeQuery)("SELECT COUNT(*) as count FROM questions");let E={};if(o)E=(await (0,c.executeQuery)(m)).reduce((e,a)=>(e[a.programName]={maxScore:Number.parseFloat(a.maxScore)||10,questionCount:Number.parseInt(a.questionCount)||0},e),{});else{let a=Number.parseInt(e[0].count);console.log("[v0] Dashboard API: Found",a,"total questions")}let T=d.reduce((e,a)=>{let t=a.projectId;return e[t]||(e[t]=[]),e[t].push(a),e},{}),N=i.map(a=>{let t=T[a.id]||[];console.log(`[v0] Dashboard API: Project ${a.name} has ${t.length} evaluations`),t.length>0&&(console.log(`[v0] Project ${a.name} evaluation details:`),t.slice(0,5).forEach((e,a)=>{console.log(`[v0] - Eval ${a}: blockName="${e.blockName}", score=${e.score}, questionMaxScore=${e.questionMaxScore}`)}));let r=0,i=0,s=t.length>0?t.reduce((e,a)=>e+Number.parseFloat(a.score),0)/t.length:0;if(o){let e=E[a.programName];i=e?e.maxScore:10,r=s/5*i}else{let a=Number.parseInt(e[0].count);i=5*a,r=s*t.length/a}let n=14;o&&E[a.programName]&&(n=E[a.programName].questionCount);let c=t.reduce((e,a)=>{let t=a.judgeId||"unknown";return e[t]=(e[t]||0)+1,e},{}),u=Object.values(c).filter(e=>e>=n).length,d=l>0?u/l*100:0;console.log(`[v0] Project ${a.name} completion: ${u}/${l} judges completed = ${d.toFixed(1)}%`);let m=t.reduce((e,a)=>{let t=a.blockName;if(!t||"null"===t||"undefined"===t)return console.log(`[v0] Skipping evaluation with invalid blockName: "${t}"`),e;e[t]||(e[t]={total:0,count:0});let o=Number.parseFloat(a.score)||0;return e[t].total+=o,e[t].count+=1,e},{});console.log(`[v0] Project ${a.name} block calculations:`),Object.entries(m).forEach(([e,a])=>{let t=a.count>0?a.total/a.count:0;console.log(`[v0] - Block "${e}": total=${a.total}, count=${a.count}, average=${t.toFixed(2)}`)});let N=Object.entries(m).map(([e,a])=>({blockName:e,average:a.count>0?a.total/a.count:0}));return console.log(`[v0] Project ${a.name} final scores:`),console.log(`[v0] - averageScore: ${s}`),console.log(`[v0] - totalScore: ${r}`),console.log(`[v0] - blockAverages count: ${N.length}`),{id:a.id,name:a.name,team:a.teamName,teamDescription:a.teamDescription,program:a.programName,totalScore:r,averageScore:s,maxPossibleScore:i,completionPercentage:d,evaluationCount:u,totalEvaluations:t.length,totalJudges:l,blockAverages:N}});N.sort((e,a)=>(a.averageScore||0)-(e.averageScore||0));let p=N.map((e,a)=>({...e,rank:a+1}));return console.log("[v0] Dashboard API: Final response summary:"),p.slice(0,3).forEach((e,a)=>{console.log(`[v0] Rank ${e.rank}: ${e.name} - avg: ${e.averageScore}, total: ${e.totalScore}, blocks: ${e.blockAverages.length}`)}),console.log("[v0] Dashboard API: Returning",p.length,"ranked projects"),n.Z.json(p)}catch(e){return console.error("[v0] Dashboard error:",e),(0,c.Lb)(e,"Failed to fetch dashboard data")}}let u=new r.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/dashboard/route",pathname:"/api/dashboard",filename:"route",bundlePath:"app/api/dashboard/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\dashboard\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:E,headerHooks:T,staticGenerationBailout:N}=u,p="/api/dashboard/route";function g(){return(0,s.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:m})}},9568:(e,a,t)=>{t.d(a,{Lb:()=>c,UZ:()=>l,executeQuery:()=>n,xN:()=>u});var o=t(9539);class r{async acquireConnection(){return new Promise((e,a)=>{if(this.circuitBreakerOpen){a(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){a(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let a=Date.now(),t=a-this.lastRequestTime;t<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-t):(this.lastRequestTime=a,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let i=new r,s=(0,o.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function n(e,a=[]){let t;try{await i.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let o=1;o<=3;o++)try{let t;return console.log(`[v0] Executing query (attempt ${o}):`,e.substring(0,100)+"..."),t=a.length>0?await s.query(e,a):await s.query(e,[]),i.reportSuccess(),Array.isArray(t)?t:[t]}catch(c){t=c,console.error(`[v0] Query execution failed (attempt ${o}):`,{query:e.substring(0,100)+"...",params:a,error:c.message});let r=c.message?.toLowerCase()||"",s=r.includes("too many")||r.includes("rate limit")||r.includes("unexpected token")||r.includes("invalid json")||r.includes("too many r")||r.includes("429"),n=r.includes("failed to fetch")||r.includes("connection")||r.includes("timeout")||"ECONNRESET"===c.code||"ETIMEDOUT"===c.code;if(s&&i.reportFailure(),o<3&&(s||n)){let e=s?1e4:2e3,a=Math.min(e*Math.pow(2,o-1),6e4);console.log(`[v0] ${s?"Rate limit detected":"Connection error"}, retrying in ${a}ms...`),await new Promise(e=>setTimeout(e,a));continue}throw c}throw t}finally{i.releaseConnection()}}function c(e,a){return(console.error(`[v0] Database error in ${a}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function l(){try{if(await n("SELECT 1 as test"),!((await n(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await n("SELECT COUNT(*) as count FROM programs"),a=e[0]?.count>0;return{database:!0,tables:!0,data:a}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function u(){try{return console.log("[v0] Initializing database..."),await s.query(`
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
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var a=require("../../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),o=a.X(0,[638,539,206],()=>t(3709));module.exports=o})();