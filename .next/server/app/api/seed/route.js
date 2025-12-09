"use strict";(()=>{var e={};e.id=520,e.ids=[520,568],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8231:(e,a,o)=>{o.r(a),o.d(a,{headerHooks:()=>g,originalPathname:()=>E,patchFetch:()=>O,requestAsyncStorage:()=>_,routeModule:()=>d,serverHooks:()=>p,staticGenerationAsyncStorage:()=>m,staticGenerationBailout:()=>N});var i={};o.r(i),o.d(i,{GET:()=>u,POST:()=>l});var n=o(5419),c=o(9108),r=o(9678),t=o(8070),s=o(9568);async function l(){try{console.log("[v0] Starting database seeding process..."),console.log("[v0] Step 0: Updating database schema...");try{await (0,s.executeQuery)(`
        ALTER TABLE judges ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Jurados nacionales'
      `),console.log("[v0] Added category column to judges")}catch(e){console.log("[v0] Category column already exists or error:",e.message)}try{await (0,s.executeQuery)(`
        ALTER TABLE blocks ADD COLUMN IF NOT EXISTS "programId" VARCHAR(255)
      `),console.log("[v0] Added programId column to blocks")}catch(e){console.log("[v0] ProgramId column already exists in blocks or error:",e.message)}try{await (0,s.executeQuery)(`
        ALTER TABLE questions ADD COLUMN IF NOT EXISTS "programId" VARCHAR(255)
      `),console.log("[v0] Added programId column to questions")}catch(e){console.log("[v0] ProgramId column already exists in questions or error:",e.message)}try{await (0,s.executeQuery)(`
        ALTER TABLE questions ADD COLUMN IF NOT EXISTS description TEXT
      `),console.log("[v0] Added description column to questions")}catch(e){console.log("[v0] Description column already exists in questions or error:",e.message)}try{await (0,s.executeQuery)(`
        ALTER TABLE questions ADD COLUMN IF NOT EXISTS score DECIMAL(3,2) DEFAULT 0.5
      `),console.log("[v0] Added score column to questions")}catch(e){console.log("[v0] Score column already exists in questions or error:",e.message)}return console.log("[v0] Step 1: Clearing existing data..."),await (0,s.executeQuery)("DELETE FROM evaluations"),console.log("[v0] Cleared evaluations"),await (0,s.executeQuery)("DELETE FROM questions"),console.log("[v0] Cleared questions"),await (0,s.executeQuery)("DELETE FROM projects"),console.log("[v0] Cleared projects"),await (0,s.executeQuery)("DELETE FROM judges"),console.log("[v0] Cleared judges"),await (0,s.executeQuery)("DELETE FROM blocks"),console.log("[v0] Cleared blocks"),await (0,s.executeQuery)("DELETE FROM teams"),console.log("[v0] Cleared teams"),await (0,s.executeQuery)("DELETE FROM programs"),console.log("[v0] Cleared programs"),console.log("[v0] Step 2: Creating programs..."),await (0,s.executeQuery)(`
      INSERT INTO programs (id, name, description, "createdAt", "updatedAt") VALUES
      ('prog_incubacion', 'Programa de Incubaci\xf3n', 'Programa para startups en etapa temprana', NOW(), NOW()),
      ('prog_aceleracion', 'Programa de Aceleraci\xf3n', 'Programa para startups en crecimiento', NOW(), NOW())
    `),console.log("[v0] Created programs: 2"),console.log("[v0] Step 3: Creating teams..."),await (0,s.executeQuery)(`
      INSERT INTO teams (id, name, description, "createdAt", "updatedAt") VALUES
      ('team_cointable', 'Cointable', 'Equipo de Cointable', NOW(), NOW()),
      ('team_enhanced_altruism', 'Enhanced Altruism Protocol', 'Equipo de Enhanced Altruism Protocol', NOW(), NOW()),
      ('team_intezia', 'Intezia', 'Equipo de Intezia', NOW(), NOW()),
      ('team_aqua_click', 'Aqua Click', 'Equipo de Aqua Click', NOW(), NOW()),
      ('team_rial', 'Rial', 'Equipo de Rial', NOW(), NOW()),
      ('team_tu_ratings', 'Tu Ratings', 'Equipo de Tu Ratings', NOW(), NOW()),
      ('team_cercapp', 'Cercapp', 'Equipo de Cercapp', NOW(), NOW()),
      ('team_tickea', 'Tickea', 'Equipo de Tickea', NOW(), NOW()),
      ('team_conectados', 'Conectados', 'Equipo de Conectados', NOW(), NOW()),
      ('team_walinz', 'WaLinz', 'Equipo de WaLinz', NOW(), NOW())
    `),console.log("[v0] Created teams: 10"),console.log("[v0] Step 4: Creating projects..."),await (0,s.executeQuery)(`
      INSERT INTO projects (id, name, description, "programId", "teamId", "createdAt", "updatedAt") VALUES
      ('proj_cointable', 'Cointable', 'Proyecto Cointable', 'prog_incubacion', 'team_cointable', NOW(), NOW()),
      ('proj_enhanced_altruism', 'Enhanced Altruism Protocol', 'Proyecto Enhanced Altruism Protocol', 'prog_incubacion', 'team_enhanced_altruism', NOW(), NOW()),
      ('proj_intezia', 'Intezia', 'Proyecto Intezia', 'prog_incubacion', 'team_intezia', NOW(), NOW()),
      ('proj_aqua_click', 'Aqua Click', 'Proyecto Aqua Click', 'prog_incubacion', 'team_aqua_click', NOW(), NOW()),
      ('proj_rial', 'Rial', 'Proyecto Rial', 'prog_incubacion', 'team_rial', NOW(), NOW()),
      ('proj_tu_ratings', 'Tu Ratings', 'Proyecto Tu Ratings', 'prog_aceleracion', 'team_tu_ratings', NOW(), NOW()),
      ('proj_cercapp', 'Cercapp', 'Proyecto Cercapp', 'prog_aceleracion', 'team_cercapp', NOW(), NOW()),
      ('proj_tickea', 'Tickea', 'Proyecto Tickea', 'prog_aceleracion', 'team_tickea', NOW(), NOW()),
      ('proj_conectados', 'Conectados', 'Proyecto Conectados', 'prog_aceleracion', 'team_conectados', NOW(), NOW()),
      ('proj_walinz', 'WaLinz', 'Proyecto WaLinz', 'prog_aceleracion', 'team_walinz', NOW(), NOW())
    `),console.log("[v0] Created projects: 10"),console.log("[v0] Step 5: Creating judges..."),await (0,s.executeQuery)(`
      INSERT INTO judges (id, name, email, token, category, "createdAt", "updatedAt") VALUES
      -- Jurados nacionales
      ('judge_ivan_bohorquez', 'Ivan Bohorquez', 'ivan.bohorquez@judges.com', 'IvanBohorquez', 'Jurados nacionales', NOW(), NOW()),
      ('judge_daniel_alvarez', 'Daniel \xc1lvarez', 'daniel.alvarez@judges.com', 'DanielAlvarez', 'Jurados nacionales', NOW(), NOW()),
      ('judge_lorena_somoza', 'Lorena Somoza', 'lorena.somoza@judges.com', 'LorenaSomoza', 'Jurados nacionales', NOW(), NOW()),
      ('judge_alberto_ramos', 'Alberto Ramos', 'alberto.ramos@judges.com', 'AlbertoRamos', 'Jurados nacionales', NOW(), NOW()),
      ('judge_jorge_garcia', 'Jorge Garc\xeda', 'jorge.garcia@judges.com', 'JorgeGarcia', 'Jurados nacionales', NOW(), NOW()),
      ('judge_carlos_navarro', 'Carlos Navarro', 'carlos.navarro@judges.com', 'CarlosNavarro', 'Jurados nacionales', NOW(), NOW()),
      ('judge_yango', 'YANGO', 'yango@judges.com', 'YANGO', 'Jurados nacionales', NOW(), NOW()),
      ('judge_sophia_kossman', 'Sophia Kossman', 'sophia.kossman@judges.com', 'SophiaKossman', 'Jurados nacionales', NOW(), NOW()),
      ('judge_juan_gonzalez', 'Juan Gonz\xe1lez', 'juan.gonzalez@judges.com', 'JuanGonzalez', 'Jurados nacionales', NOW(), NOW()),
      ('judge_julia_delgado', 'Julia Delgado', 'julia.delgado@judges.com', 'JuliaDelgado', 'Jurados nacionales', NOW(), NOW()),
      ('judge_isaias_meza', 'Isaias Meza', 'isaias.meza@judges.com', 'IsaiasMeza', 'Jurados nacionales', NOW(), NOW()),
      -- Jurado BDV
      ('judge_loyola_rosales', 'Loyola Rosales (CME Marketing)', 'loyola.rosales@judges.com', 'LoyolaRosales', 'Jurado BDV', NOW(), NOW()),
      ('judge_alex_gomez', 'Alex G\xf3mez (Innoven)', 'alex.gomez@judges.com', 'AlexGomez', 'Jurado BDV', NOW(), NOW()),
      ('judge_luis_jassir', 'Luis Michel Jassir (Square One Capital)', 'luis.jassir@judges.com', 'LuisMichelJassir', 'Jurado BDV', NOW(), NOW()),
      ('judge_sandy_gomez', 'Sandy G\xf3mez (Arca An\xe1lisis)', 'sandy.gomez@judges.com', 'SandyGomez', 'Jurado BDV', NOW(), NOW()),
      ('judge_antonio_guerra', 'Antonio Guerra (Enlaparada)', 'antonio.guerra@judges.com', 'AntonioGuerra', 'Jurado BDV', NOW(), NOW()),
      ('judge_pedro_berroteran', 'Pedro Berroteran (LEGA Abogados)', 'pedro.berroteran@judges.com', 'PedroBerroteran', 'Jurado BDV', NOW(), NOW()),
      -- Jurados internacionales
      ('judge_ivan_perez', 'Iv\xe1n Perez', 'ivan.perez@judges.com', 'IvanPerez', 'Jurados internacionales', NOW(), NOW()),
      ('judge_eleonora_coppola', 'Eleonora Coppola', 'eleonora.coppola@judges.com', 'EleonoraCoppola', 'Jurados internacionales', NOW(), NOW()),
      ('judge_jose_ramirez', 'Jos\xe9 Willington Ram\xedrez', 'jose.ramirez@judges.com', 'JoseWillingtonRamirez', 'Jurados internacionales', NOW(), NOW()),
      ('judge_alejandro_zotti', 'Alejandro Zotti', 'alejandro.zotti@judges.com', 'AlejandroZotti', 'Jurados internacionales', NOW(), NOW()),
      ('judge_angelo_zambrano', 'Angelo Zambrano', 'angelo.zambrano@judges.com', 'AngeloZambrano', 'Jurados internacionales', NOW(), NOW())
    `),console.log("[v0] Created judges: 21"),console.log("[v0] Step 6: Creating blocks..."),await (0,s.executeQuery)(`
      INSERT INTO blocks (id, name, description, "order", "programId", "createdAt", "updatedAt") VALUES
      -- Incubaci\xf3n blocks
      ('block_inc_innovacion', 'Innovaci\xf3n', 'Evaluaci\xf3n de la innovaci\xf3n del proyecto', 1, 'prog_incubacion', NOW(), NOW()),
      ('block_inc_mercado', 'Mercado', 'An\xe1lisis del mercado y oportunidad', 2, 'prog_incubacion', NOW(), NOW()),
      ('block_inc_equipo', 'Equipo', 'Evaluaci\xf3n del equipo fundador', 3, 'prog_incubacion', NOW(), NOW()),
      ('block_inc_modelo', 'Modelo de Negocio', 'Viabilidad del modelo de negocio', 4, 'prog_incubacion', NOW(), NOW()),
      ('block_inc_financiero', 'Financiero', 'Proyecciones y viabilidad financiera', 5, 'prog_incubacion', NOW(), NOW()),
      -- Aceleraci\xf3n blocks
      ('block_acc_innovacion', 'Innovaci\xf3n', 'Evaluaci\xf3n de la innovaci\xf3n del proyecto', 1, 'prog_aceleracion', NOW(), NOW()),
      ('block_acc_mercado', 'Mercado', 'An\xe1lisis del mercado y oportunidad', 2, 'prog_aceleracion', NOW(), NOW()),
      ('block_acc_equipo', 'Equipo', 'Evaluaci\xf3n del equipo fundador', 3, 'prog_aceleracion', NOW(), NOW()),
      ('block_acc_modelo', 'Modelo de Negocio', 'Viabilidad del modelo de negocio', 4, 'prog_aceleracion', NOW(), NOW()),
      ('block_acc_financiero', 'Financiero', 'Proyecciones y viabilidad financiera', 5, 'prog_aceleracion', NOW(), NOW())
    `),console.log("[v0] Created blocks: 10"),console.log("[v0] Step 7: Creating questions..."),await (0,s.executeQuery)(`
      INSERT INTO questions (id, text, description, score, "blockId", "programId", "order", "createdAt", "updatedAt") VALUES
      -- Incubaci\xf3n - Innovaci\xf3n (Total: ~2.0 puntos)
      ('q_inc_inn_1', '\xbfQu\xe9 tan innovadora es la soluci\xf3n propuesta?', 'Evaluar el nivel de innovaci\xf3n y diferenciaci\xf3n de la propuesta', 0.7, 'block_inc_innovacion', 'prog_incubacion', 1, NOW(), NOW()),
      ('q_inc_inn_2', '\xbfEl proyecto resuelve un problema real y significativo?', 'Verificar que aborde una necesidad genuina del mercado', 0.8, 'block_inc_innovacion', 'prog_incubacion', 2, NOW(), NOW()),
      ('q_inc_inn_3', '\xbfQu\xe9 tan diferenciada es la propuesta de valor?', 'Analizar la diferenciaci\xf3n competitiva', 0.5, 'block_inc_innovacion', 'prog_incubacion', 3, NOW(), NOW()),
      -- Incubaci\xf3n - Mercado (Total: ~2.0 puntos)
      ('q_inc_mer_1', '\xbfQu\xe9 tan grande es el mercado objetivo?', 'Evaluar el tama\xf1o y potencial del mercado', 0.6, 'block_inc_mercado', 'prog_incubacion', 1, NOW(), NOW()),
      ('q_inc_mer_2', '\xbfEl equipo comprende bien su mercado?', 'Verificar el conocimiento del mercado objetivo', 0.7, 'block_inc_mercado', 'prog_incubacion', 2, NOW(), NOW()),
      ('q_inc_mer_3', '\xbfExiste tracci\xf3n o validaci\xf3n del mercado?', 'Evaluar evidencia de demanda del mercado', 0.7, 'block_inc_mercado', 'prog_incubacion', 3, NOW(), NOW()),
      -- Incubaci\xf3n - Equipo (Total: ~2.0 puntos)
      ('q_inc_equ_1', '\xbfEl equipo tiene las competencias necesarias?', 'Evaluar habilidades t\xe9cnicas y de negocio', 0.8, 'block_inc_equipo', 'prog_incubacion', 1, NOW(), NOW()),
      ('q_inc_equ_2', '\xbfQu\xe9 tan comprometido est\xe1 el equipo?', 'Verificar dedicaci\xf3n y compromiso del equipo', 0.6, 'block_inc_equipo', 'prog_incubacion', 2, NOW(), NOW()),
      ('q_inc_equ_3', '\xbfEl equipo tiene experiencia relevante?', 'Analizar experiencia previa en el sector', 0.6, 'block_inc_equipo', 'prog_incubacion', 3, NOW(), NOW()),
      -- Incubaci\xf3n - Modelo de Negocio (Total: ~2.0 puntos)
      ('q_inc_mod_1', '\xbfEl modelo de negocio es claro y viable?', 'Evaluar claridad y viabilidad del modelo', 0.7, 'block_inc_modelo', 'prog_incubacion', 1, NOW(), NOW()),
      ('q_inc_mod_2', '\xbfLas fuentes de ingresos est\xe1n bien definidas?', 'Verificar claridad en monetizaci\xf3n', 0.6, 'block_inc_modelo', 'prog_incubacion', 2, NOW(), NOW()),
      ('q_inc_mod_3', '\xbfLa estrategia de go-to-market es s\xf3lida?', 'Analizar plan de llegada al mercado', 0.7, 'block_inc_modelo', 'prog_incubacion', 3, NOW(), NOW()),
      -- Incubaci\xf3n - Financiero (Total: ~2.0 puntos)
      ('q_inc_fin_1', '\xbfLas proyecciones financieras son realistas?', 'Evaluar realismo de proyecciones', 0.6, 'block_inc_financiero', 'prog_incubacion', 1, NOW(), NOW()),
      ('q_inc_fin_2', '\xbfEl proyecto tiene potencial de escalabilidad?', 'Verificar capacidad de crecimiento', 0.8, 'block_inc_financiero', 'prog_incubacion', 2, NOW(), NOW()),
      ('q_inc_fin_3', '\xbfLos requerimientos de inversi\xf3n son apropiados?', 'Analizar necesidades de financiamiento', 0.6, 'block_inc_financiero', 'prog_incubacion', 3, NOW(), NOW()),
      -- Aceleraci\xf3n - Innovaci\xf3n (Total: ~2.0 puntos)
      ('q_acc_inn_1', '\xbfLa innovaci\xf3n es escalable y sostenible?', 'Evaluar capacidad de escalar la innovaci\xf3n', 0.8, 'block_acc_innovacion', 'prog_aceleracion', 1, NOW(), NOW()),
      ('q_acc_inn_2', '\xbfExiste protecci\xf3n intelectual de la innovaci\xf3n?', 'Verificar protecci\xf3n de propiedad intelectual', 0.5, 'block_acc_innovacion', 'prog_aceleracion', 2, NOW(), NOW()),
      ('q_acc_inn_3', '\xbfLa tecnolog\xeda est\xe1 validada y probada?', 'Analizar madurez tecnol\xf3gica', 0.7, 'block_acc_innovacion', 'prog_aceleracion', 3, NOW(), NOW()),
      -- Aceleraci\xf3n - Mercado (Total: ~2.0 puntos)
      ('q_acc_mer_1', '\xbfExiste tracci\xf3n comprobada en el mercado?', 'Evaluar evidencia de tracci\xf3n real', 0.8, 'block_acc_mercado', 'prog_aceleracion', 1, NOW(), NOW()),
      ('q_acc_mer_2', '\xbfEl crecimiento del mercado es sostenible?', 'Verificar sostenibilidad del crecimiento', 0.7, 'block_acc_mercado', 'prog_aceleracion', 2, NOW(), NOW()),
      ('q_acc_mer_3', '\xbfLa estrategia de expansi\xf3n es clara?', 'Analizar plan de expansi\xf3n de mercado', 0.5, 'block_acc_mercado', 'prog_aceleracion', 3, NOW(), NOW()),
      -- Aceleraci\xf3n - Equipo (Total: ~2.0 puntos)
      ('q_acc_equ_1', '\xbfEl equipo puede ejecutar el plan de crecimiento?', 'Evaluar capacidad de ejecuci\xf3n', 0.8, 'block_acc_equipo', 'prog_aceleracion', 1, NOW(), NOW()),
      ('q_acc_equ_2', '\xbfExiste un plan de contrataci\xf3n estructurado?', 'Verificar estrategia de crecimiento del equipo', 0.5, 'block_acc_equipo', 'prog_aceleracion', 2, NOW(), NOW()),
      ('q_acc_equ_3', '\xbfEl liderazgo es adecuado para la escala?', 'Analizar capacidad de liderazgo', 0.7, 'block_acc_equipo', 'prog_aceleracion', 3, NOW(), NOW()),
      -- Aceleraci\xf3n - Modelo de Negocio (Total: ~2.0 puntos)
      ('q_acc_mod_1', '\xbfEl modelo genera ingresos recurrentes?', 'Evaluar recurrencia de ingresos', 0.8, 'block_acc_modelo', 'prog_aceleracion', 1, NOW(), NOW()),
      ('q_acc_mod_2', '\xbfExisten m\xfaltiples fuentes de ingresos?', 'Verificar diversificaci\xf3n de ingresos', 0.5, 'block_acc_modelo', 'prog_aceleracion', 2, NOW(), NOW()),
      ('q_acc_mod_3', '\xbfLa unidad econ\xf3mica es rentable?', 'Analizar rentabilidad por unidad', 0.7, 'block_acc_modelo', 'prog_aceleracion', 3, NOW(), NOW()),
      -- Aceleraci\xf3n - Financiero (Total: ~2.0 puntos)
      ('q_acc_fin_1', '\xbfExiste un plan financiero detallado?', 'Evaluar detalle del plan financiero', 0.7, 'block_acc_financiero', 'prog_aceleracion', 1, NOW(), NOW()),
      ('q_acc_fin_2', '\xbfLos m\xe9tricas clave est\xe1n bien definidas?', 'Verificar claridad en KPIs financieros', 0.7, 'block_acc_financiero', 'prog_aceleracion', 2, NOW(), NOW()),
      ('q_acc_fin_3', '\xbfEl retorno de inversi\xf3n es atractivo?', 'Analizar atractivo para inversionistas', 0.6, 'block_acc_financiero', 'prog_aceleracion', 3, NOW(), NOW())
    `),console.log("[v0] Created questions: 30"),console.log("[v0] Database seeding completed successfully!"),t.Z.json({success:!0,message:"Database seeded successfully with comprehensive new data",summary:{programs:2,blocks:10,questions:30,teams:10,projects:10,judges:21,evaluations:0}})}catch(o){console.error("[v0] Seeding error details:",{message:o.message,stack:o.stack,name:o.name});let{message:e,status:a}=(0,s.Lb)(o,"Failed to seed database");return t.Z.json({success:!1,error:e,details:o.message},{status:a})}}async function u(){try{let[e,a,o,i,n,c,r,l]=await Promise.all([(0,s.executeQuery)("SELECT COUNT(*) as count FROM programs"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM blocks"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM questions"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM teams"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM projects"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM judges"),(0,s.executeQuery)("SELECT COUNT(*) as count FROM evaluations"),(0,s.executeQuery)(`
        SELECT COUNT(DISTINCT 
          CASE 
            WHEN evaluations_count.total_evaluations = questions_count.total_questions 
            THEN evaluations_count.judge_project 
            ELSE NULL 
          END
        ) as count
        FROM (
          SELECT 
            CONCAT(e."judgeId", '-', e."projectId") as judge_project,
            COUNT(*) as total_evaluations
          FROM evaluations e
          GROUP BY e."judgeId", e."projectId"
        ) evaluations_count
        CROSS JOIN (
          SELECT COUNT(*) as total_questions FROM questions
        ) questions_count
      `)]),u={programs:Number.parseInt(e[0].count),blocks:Number.parseInt(a[0].count),questions:Number.parseInt(o[0].count),teams:Number.parseInt(i[0].count),projects:Number.parseInt(n[0].count),judges:Number.parseInt(c[0].count),evaluations:Number.parseInt(l[0].count)};return t.Z.json({status:"Database Status",counts:u,isEmpty:Object.values(u).every(e=>0===e)})}catch(o){console.error("[v0] Seed GET error:",o);let{message:e,status:a}=(0,s.Lb)(o,"Failed to get database status");return t.Z.json({error:e},{status:a})}}let d=new n.AppRouteRouteModule({definition:{kind:c.x.APP_ROUTE,page:"/api/seed/route",pathname:"/api/seed",filename:"route",bundlePath:"app/api/seed/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\seed\\route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:_,staticGenerationAsyncStorage:m,serverHooks:p,headerHooks:g,staticGenerationBailout:N}=d,E="/api/seed/route";function O(){return(0,r.patchFetch)({serverHooks:p,staticGenerationAsyncStorage:m})}},9568:(e,a,o)=>{o.d(a,{Lb:()=>s,UZ:()=>l,executeQuery:()=>t,xN:()=>u});var i=o(9539);class n{async acquireConnection(){return new Promise((e,a)=>{if(this.circuitBreakerOpen){a(Error("Circuit breaker is open - too many rate limit errors"));return}if(this.requestQueue.length>=this.maxQueueSize){a(Error("Request queue is full - system overloaded"));return}this.activeConnections<this.maxConnections?(this.activeConnections++,this.throttleRequest(e)):this.requestQueue.push(()=>{this.activeConnections++,this.throttleRequest(e)})})}throttleRequest(e){let a=Date.now(),o=a-this.lastRequestTime;o<this.minDelay?setTimeout(()=>{this.lastRequestTime=Date.now(),e()},this.minDelay-o):(this.lastRequestTime=a,e())}releaseConnection(){if(this.activeConnections--,this.requestQueue.length>0){let e=this.requestQueue.shift();e&&e()}}reportSuccess(){this.consecutiveFailures=0,this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker closed - resuming normal operations"),this.circuitBreakerOpen=!1,this.circuitBreakerTimeout&&(clearTimeout(this.circuitBreakerTimeout),this.circuitBreakerTimeout=null))}reportFailure(){this.consecutiveFailures++,this.consecutiveFailures>=this.maxFailures&&!this.circuitBreakerOpen&&(console.log("[v0] Circuit breaker opened - pausing requests for 30 seconds"),this.circuitBreakerOpen=!0,this.circuitBreakerTimeout=setTimeout(()=>{console.log("[v0] Circuit breaker half-open - testing connection"),this.circuitBreakerOpen=!1,this.consecutiveFailures=0},3e4))}constructor(){this.activeConnections=0,this.maxConnections=3,this.requestQueue=[],this.maxQueueSize=10,this.minDelay=500,this.lastRequestTime=0,this.circuitBreakerOpen=!1,this.circuitBreakerTimeout=null,this.consecutiveFailures=0,this.maxFailures=3}}let c=new n,r=(0,i.qn)(process.env.DATABASE_URL,{fetchConnectionCache:!0});async function t(e,a=[]){let o;try{await c.acquireConnection()}catch(e){throw console.error("[v0] Failed to acquire connection:",e.message),Error("Database connection unavailable - system overloaded")}try{for(let i=1;i<=3;i++)try{let o;return console.log(`[v0] Executing query (attempt ${i}):`,e.substring(0,100)+"..."),o=a.length>0?await r.query(e,a):await r.query(e,[]),c.reportSuccess(),Array.isArray(o)?o:[o]}catch(s){o=s,console.error(`[v0] Query execution failed (attempt ${i}):`,{query:e.substring(0,100)+"...",params:a,error:s.message});let n=s.message?.toLowerCase()||"",r=n.includes("too many")||n.includes("rate limit")||n.includes("unexpected token")||n.includes("invalid json")||n.includes("too many r")||n.includes("429"),t=n.includes("failed to fetch")||n.includes("connection")||n.includes("timeout")||"ECONNRESET"===s.code||"ETIMEDOUT"===s.code;if(r&&c.reportFailure(),i<3&&(r||t)){let e=r?1e4:2e3,a=Math.min(e*Math.pow(2,i-1),6e4);console.log(`[v0] ${r?"Rate limit detected":"Connection error"}, retrying in ${a}ms...`),await new Promise(e=>setTimeout(e,a));continue}throw s}throw o}finally{c.releaseConnection()}}function s(e,a){return(console.error(`[v0] Database error in ${a}:`,{message:e.message,code:e.code,detail:e.detail,hint:e.hint}),"23505"===e.code)?{message:"Duplicate entry - record already exists",status:409}:"23503"===e.code?{message:"Referenced record not found",status:400}:"23514"===e.code?{message:"Invalid data - constraint violation",status:400}:e.message?.includes("connection")?{message:"Database connection error",status:503}:e.message?.includes("timeout")?{message:"Database operation timed out",status:504}:{message:`Database error: ${e.message}`,status:500}}async function l(){try{if(await t("SELECT 1 as test"),!((await t(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('programs', 'teams', 'projects', 'judges', 'blocks', 'questions', 'evaluations')
    `)).length>=7))return{database:!0,tables:!1,data:!1,error:"Missing required tables"};let e=await t("SELECT COUNT(*) as count FROM programs"),a=e[0]?.count>0;return{database:!0,tables:!0,data:a}}catch(e){return console.error("[v0] System health check failed:",e),{database:!1,tables:!1,data:!1,error:e.message}}}async function u(){try{return console.log("[v0] Initializing database..."),await r.query(`
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
    `),console.log("[v0] Database initialized successfully"),{success:!0}}catch(e){return console.error("[v0] Database initialization failed:",e),{success:!1,error:e.message}}}}};var a=require("../../../webpack-runtime.js");a.C(e);var o=e=>a(a.s=e),i=a.X(0,[638,539,206],()=>o(8231));module.exports=i})();