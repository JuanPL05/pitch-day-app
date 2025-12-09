"use strict";(()=>{var e={};e.id=511,e.ids=[511],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2904:(e,a,s)=>{s.r(a),s.d(a,{headerHooks:()=>l,originalPathname:()=>E,patchFetch:()=>g,requestAsyncStorage:()=>u,routeModule:()=>c,serverHooks:()=>d,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>T});var t={};s.r(t),s.d(t,{POST:()=>i});var o=s(5419),r=s(9108),n=s(9678);async function i(){try{let{executeQuery:e}=await Promise.all([s.e(539),s.e(568)]).then(s.bind(s,9568));console.log("[v0] Starting database schema update..."),await e(`
      ALTER TABLE questions 
      ADD COLUMN IF NOT EXISTS description TEXT,
      ADD COLUMN IF NOT EXISTS "programId" TEXT
    `),await e(`
      ALTER TABLE questions 
      ADD COLUMN IF NOT EXISTS score NUMERIC(3,2) DEFAULT 0.5
    `),console.log("[v0] Updating score constraint to 0.2 - 1.2 range..."),await e(`
      ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_score_range
    `),await e(`
      ALTER TABLE questions ADD CONSTRAINT questions_score_range 
      CHECK (score >= 0.2 AND score <= 1.2)
    `),console.log("[v0] Score constraint updated to allow 0.2 - 1.2 range"),await e(`
      ALTER TABLE judges 
      ADD COLUMN IF NOT EXISTS category TEXT
    `);let a=await e(`
      SELECT COUNT(*) as count
      FROM information_schema.table_constraints 
      WHERE constraint_name = 'fk_questions_program' 
      AND table_name = 'questions'
    `);return 0===a[0].count?(await e(`
        ALTER TABLE questions 
        ADD CONSTRAINT fk_questions_program 
        FOREIGN KEY ("programId") REFERENCES programs(id)
      `),console.log("[v0] Foreign key constraint added successfully")):console.log("[v0] Foreign key constraint already exists, skipping"),console.log("[v0] Database schema updated successfully"),Response.json({success:!0,message:"Database schema updated successfully - Score range now 0.2 - 1.2"})}catch(e){return console.error("[v0] Schema update error:",e),Response.json({success:!1,error:e instanceof Error?e.message:"Unknown error"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/update-schema/route",pathname:"/api/update-schema",filename:"route",bundlePath:"app/api/update-schema/route"},resolvedPagePath:"C:\\Users\\juan\\Documents\\pitch-day-app\\app\\api\\update-schema\\route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:u,staticGenerationAsyncStorage:p,serverHooks:d,headerHooks:l,staticGenerationBailout:T}=c,E="/api/update-schema/route";function g(){return(0,n.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:p})}},5419:(e,a,s)=>{e.exports=s(517)}};var a=require("../../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),t=a.X(0,[638],()=>s(2904));module.exports=t})();