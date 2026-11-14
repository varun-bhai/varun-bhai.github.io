(() => {
  const root = document.getElementById('pixel-portfolio-review');
  if (location.protocol === 'file:') {
    const otherPortfolio = root.querySelector('[data-local-href]');
    otherPortfolio.href = otherPortfolio.dataset.localHref;
  }

  const labels = {home:'Welcome',about:'About me',data:'Data Projects',research:'Research Projects',beyond:'Outside the Lab',writing:'Writing',cv:'CV',contact:'Contact',publications:'Publications & Preprints','cv-data':'Data Analysis CV','cv-research':'Computational Biology CV'};
  const folderOrder = ['about','data','research','beyond','writing','cv','contact'];
  const projects = {
    alpha:{name:'Alpha-Mod: peptide modelling with AlphaFold2',category:'research',subtitle:'Master’s thesis · IIIT Delhi',tags:['AlphaFold2','ET-Flow','Python','Benchmarking'],question:'How can we predict the shape of a peptide when some of its amino acids are chemically modified?',work:'For my master’s thesis at IIIT Delhi, I built Alpha-Mod, a pipeline that uses AlphaFold2 to predict a peptide backbone and then incorporates and refines its modified residues.',result:'I benchmarked the pipeline across three peptide datasets and built batch processing, failure recovery, and reporting so the runs could be compared.',url:'https://github.com/raghavagps/Alpha-Mod'},
    root:{name:'Root Regeneration',category:'research',subtitle:'Plant biology · IISER Pune',tags:['Arabidopsis','Genotyping','Regeneration assays'],question:'How does autophagy affect the ability of Arabidopsis leaf tissue to form new roots?',work:'In Prof. Kalika Prasad’s lab, I screened ATG8F/ATG8H plants by PCR, identified two double mutants, and ran a pilot regeneration assay. I also worked on fluorescent reporters for ATHB8 and YUCCA4.',result:'The assay provided preliminary observations. Larger samples and microscopy were planned as follow-up.'},
    skin:{name:'Skin Lesion Classification',category:'research',subtitle:'Coursework · seven-class image classification',tags:['PyTorch','CNN','HAM10000'],question:'Can a small neural network learn to sort dermatoscopic images into seven categories?',work:'I wrote a data loader for RGB images organised by class, resized and normalised the inputs, and implemented a custom four-block PyTorch CNN and a training loop.',result:'The repository includes sample images and saved weights. The prototype demonstrates the training setup, with no verified held-out performance reported.',url:'https://github.com/varun-bhai/Skin_Disease_Classification_CNN_model'},
    genome:{name:'Mitochondrial Genome Comparison',category:'research',subtitle:'Exploratory semester project · COSPI Lab, IISER Pune',tags:['Comparative genomics','BLAST'],question:'What differs between human and yeast mitochondrial genomes?',work:'I explored differences in sequence composition and used a small script to scan for candidate open reading frames. I compared selected candidates with reference proteins using BLAST.',result:'This was an exercise in sequence comparison. The matches were exploratory leads.'},
    upi:{name:'UPI Growth & Cash Access',category:'data',subtitle:'Payment adoption, merchant mix, and cash-access trends in India',tags:['SQL','SQLite','Python','HTML / JS'],question:'Where are digital payments growing, and how is cash access changing alongside them?',work:'Built a reproducible analytics model from eight public sources, with 16 SQL analyses and an interactive dashboard covering state growth, payment mix, and business signals.',result:'The analysis brings together state-level PhonePe activity and national payment and cash-access measures, with source definitions and validation checks.',url:'https://github.com/varun-bhai/upi-cash-context-india',demo:'https://varun-bhai.github.io/upi-cash-context-india/dashboard_site/'},
    promise:{name:'Promise at Risk',category:'data',subtitle:'Finding delivery failures that put customer trust at risk',tags:['SQL','SQLite','Python','Data quality'],question:'Which late deliveries should an operations team investigate first?',work:'Joined eight Olist tables into a model with one row per order, then analysed delivery delays, customer reviews, and seller exposure.',result:'Across 96,470 valid delivered orders, the analysis found an 8.1% late-delivery rate and BRL 1.35M in late-order value exposure.',url:'https://github.com/varun-bhai/promise-at-risk',demo:'https://varun-bhai.github.io/promise-at-risk/dashboard/'},
  };
  const btn=(id,label,cls='')=>`<button type="button" class="cursor-interaction ${cls}" data-page="${id}">${label}</button>`;
  const link=(url,label)=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  const eyebrow=t=>`<p class="eyebrow">${t}</p>`;
  const row=(id,title,subtitle)=>btn(id,`<span>${title}<small>${subtitle}</small></span><span aria-hidden="true">→</span>`,'project-row');
  const rows=ids=>`<div class="project-list">${ids.map(id=>row(id,projects[id].name,projects[id].subtitle)).join('')}</div>`;
  const actions=(...items)=>`<div class="actions">${items.join('')}</div>`;
  const block=(title,copy)=>`<div class="block"><h3>${title}</h3><p>${copy}</p></div>`;
  const researchIds=['alpha','root','skin','genome'];
  const preprint=()=>row('publications','PEPstrMOD2','Co-authored bioRxiv preprint · 2026');
  const pdfNames={'cv-data':'Data Analysis','cv-research':'Computational Biology'};
  const getName=page=>labels[page] || projects[page]?.name;
  function content(page,analytics) {
    if (projects[page]) {
      const p=projects[page];
      return `${eyebrow(p.category==='data'?'DATA PROJECTS':'RESEARCH PROJECTS')}<h2>${p.name}</h2><p>${p.question}</p><div class="chips">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${block(p.category==='data'?'What I built':'My contribution',p.work)}${block(p.category==='data'?'What I found':'Project outcome',p.result)}${page==='promise'?'<div class="stats"><div><strong>96,470</strong><small>delivered orders</small></div><div><strong>8.1%</strong><small>arrived late</small></div><div><strong>BRL 1.35M</strong><small>late-order value</small></div></div>':''}${actions(p.url?link(p.url,'View code'):'',p.demo?link(p.demo,'Open dashboard'):'',page==='alpha'?btn('publications','See preprint →'):'')}`;
    }
    if (pdfNames[page]) {
      const filename='Varun-Kumar-'+pdfNames[page].replaceAll(' ','-')+'-CV.pdf';
      const pdfUrl='assets/'+filename;
      return `${eyebrow('CURRICULUM VITAE')}<h2>${pdfNames[page]} CV</h2>${actions(link(pdfUrl,'Open PDF'),`<a class="pdf-download" download="${filename}" href="${pdfUrl}">Download PDF ↓</a>`)}<iframe class="cv-document" src="${pdfUrl}#view=FitH" title="${pdfNames[page]} CV"></iframe>`;
    }
    switch(page) {
      case 'home': return `${eyebrow(analytics?'DATA ANALYSIS':'DATA · BIO')}<h1>Hi, I’m Varun.</h1><p>${analytics?'I use SQL and Python to turn messy datasets into clear metrics and dashboards. Recent projects look at late deliveries in Brazil and digital payments in India.':'I build tools to study biological and business data. My recent work includes modelling modified peptides and analysing where e-commerce deliveries go late.'}</p><p class="muted">${analytics?'BS–MS Biology, IISER Pune.<br>Master’s thesis at IIIT Delhi.':'BS–MS in Biology · IISER Pune<br>2021–2026 · Graduated May 2026'}</p>${analytics?actions(btn('data','Explore my data projects →','primary'),btn('cv-data','View Data Analysis CV')):actions(btn('research','Explore my research →','primary'),btn('data','Explore my data projects'))}<div class="block">${eyebrow('ON MY DESK')}${rows(analytics?['promise','upi']:['alpha','promise'])}</div>`;
      case 'about': return `${eyebrow('ABOUT ME')}<h2>Varun Kumar</h2><p>${analytics?'I’m a biology graduate from IISER Pune who builds data projects with SQL and Python. I like tracing a metric back to its source, checking which records are included, and building dashboards that make the result easy to explore.':'I’m a BS–MS Biology graduate from IISER Pune. For my master’s thesis at IIIT Delhi, I built and benchmarked a peptide structure pipeline in Prof. G. P. S. Raghava’s lab.'}</p><p>${analytics?'I developed that habit during my computational biology thesis at IIIT Delhi, where I tracked which model runs succeeded, which failed, and how to compare them fairly.':'I bring the same approach to analytics: make the inputs clear, check the assumptions, and build something someone else can use. I’ve applied it to e-commerce deliveries and digital payments.'}</p>${actions(btn('data','Data Projects'),btn('research','Research Projects'),btn('beyond','Outside the Lab'))}`;
      case 'research': return `${eyebrow('SELECTED WORK')}<h2>Research Projects</h2><p>My thesis and selected projects in computational biology, plant biology, and image classification.</p>${rows(researchIds)}<div class="preprint-line">${eyebrow('PUBLICATIONS & PREPRINTS')}${preprint()}</div>`;
      case 'data': return `${eyebrow('SELECTED WORK')}<h2>Data Projects</h2><p>Case studies with SQL models, validation checks, and dashboards you can explore.</p>${rows(['promise','upi'])}${actions(btn('cv-data','View Data Analysis CV →'))}`;
      case 'publications': return `${eyebrow('PUBLICATIONS & PREPRINTS')}<h2>PEPstrMOD2</h2><p>Next-generation tertiary structure prediction of chemically modified and non-natural peptides.</p><p>Saloni Jain, Naman Kumar Mehta, Sahil Raina, Pankaj Kumar, <strong>Varun</strong>, and Gajendra P. S. Raghava.</p><p>bioRxiv preprint · July 2026</p>${actions(link('https://doi.org/10.64898/2026.06.22.733733','Read preprint'),link('https://webs.iiitd.edu.in/raghava/pepstrmod/','Visit PEPstrMOD2'))}`;
      case 'beyond': return `${eyebrow('OUTSIDE THE LAB')}<h2>There’s more to me.</h2>${block('Photography','I enjoy taking photos and finding interesting details in everyday scenes.')}${block('Movies & anime','I like watching movies and anime, and I’m always up for swapping recommendations.')}${block('Sports','I’m up for most sports. Badminton and football are the ones I play most.')}${block('Teaching','I volunteered with Abhyasika, teaching children in the local community.')}`;
      case 'writing': return `${eyebrow('WRITING')}<h2>404: Draft not found</h2><figure class="nap" aria-label="Pixel drawing of a person sleeping in a chair, dreaming about a first draft."><canvas width="160" height="105" aria-hidden="true"></canvas><figcaption>I’ll write something here…<br>after this nap.</figcaption></figure>`;
      case 'cv': {
        const data=row('cv-data','Data Analysis','PDF · case studies and analytics tools');
        const research=row('cv-research','Computational Biology','PDF · thesis, research, and preprint');
        return `${eyebrow('CURRICULUM VITAE')}<h2>CV</h2><div class="project-list">${analytics?data+research:research+data}</div>`;
      }
      case 'contact': return `${eyebrow('CONTACT')}<h2>Let’s talk.</h2><p>Reach out if you’d like to talk research, data, something you’re building, or just say hi.</p><div class="link-list">${link('mailto:vk14052k2@gmail.com','vk14052k2@gmail.com')}${link('https://github.com/varun-bhai','GitHub')}${link('https://www.linkedin.com/in/varun-kumar-3ab9a6223/','LinkedIn')}</div>`;
      default: return '';
    }
  }
  function drawNap(canvas) {
    const ctx=canvas.getContext('2d');
    if(!ctx)return;
    const ink='#171717', shade='#777', cloth='#aaa', pale='#e8e8e8', paper='#fff';
    const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
    // Pixel-snapped scanlines keep the illustration sharp at any size.
    function poly(c,...pts) {
      for(let y=0;y<105;y++){
        const hits=[];
        for(let i=0;i<pts.length;i++){
          const [x1,y1]=pts[i],[x2,y2]=pts[(i+1)%pts.length];
          if((y1<=y+.5&&y2>y+.5)||(y2<=y+.5&&y1>y+.5)){
            hits.push(Math.round(x1+(y+.5-y1)*(x2-x1)/(y2-y1)));
          }
        }
        hits.sort((a,b)=>a-b);
        for(let i=0;i+1<hits.length;i+=2)rect(hits[i],y,hits[i+1]-hits[i],1,c);
      }
    }
    // Floor, side table, and a mug.
    rect(12,95,139,1,cloth);
    rect(116,70,33,4,ink);rect(119,74,3,21,ink);rect(143,74,3,21,ink);
    rect(122,79,21,2,shade);
    rect(128,59,10,11,ink);rect(129,60,8,8,paper);rect(138,61,4,6,ink);rect(138,62,3,4,paper);
    // High backed chair with side panel and feet.
    poly(ink,[19,87],[12,67],[12,43],[17,35],[39,34],[47,41],[55,62],[85,65],[97,73],[97,87]);
    poly(shade,[21,84],[15,67],[15,44],[19,38],[40,37],[45,43],[52,66],[85,68],[94,74],[94,84]);
    poly(cloth,[20,57],[18,46],[22,41],[38,40],[42,45],[47,61],[40,72],[24,71]);
    rect(23,86,5,9,ink);rect(87,86,5,9,ink);
    // Trousers and slippers.
    poly(ink,[55,65],[78,65],[99,73],[105,86],[117,88],[118,94],[99,94],[94,89],[86,80],[64,80],[51,74]);
    poly(shade,[60,68],[78,68],[97,75],[102,86],[99,89],[91,78],[65,77]);
    rect(103,90,12,2,cloth);
    // Hoodie, head and hand; a slanted head and closed eye show the nap.
    poly(ink,[34,47],[45,41],[55,43],[62,51],[67,60],[79,63],[82,69],[77,74],[61,73],[58,70],[49,77],[39,73],[31,65]);
    poly(pale,[36,49],[44,44],[54,46],[59,52],[64,62],[74,65],[72,70],[61,70],[55,65],[48,74],[40,71],[34,64]);
    poly(cloth,[36,55],[41,60],[45,70],[41,72],[35,65]);
    poly(ink,[37,27],[47,25],[56,30],[58,38],[57,42],[54,44],[53,49],[46,51],[39,46],[34,40],[33,33]);
    poly(paper,[41,33],[53,34],[54,40],[56,41],[53,43],[51,47],[46,48],[41,45],[38,39]);
    poly(ink,[35,34],[38,28],[47,26],[55,29],[57,35],[51,35],[47,32],[44,36],[40,39],[37,40]);
    rect(47,39,5,1,ink);rect(49,40,3,1,ink);rect(50,44,3,1,shade);
    rect(74,66,5,3,paper);
    poly(ink,[21,69],[58,69],[63,73],[62,79],[27,79],[21,76]);
    poly(cloth,[24,71],[57,71],[60,73],[59,76],[26,76],[24,75]);
    // Thought trail rising toward the cloud.
    rect(63,33,3,3,shade);
    rect(73,25,4,4,shade);
    rect(86,17,6,6,shade);rect(87,18,4,4,paper);
  }
  const valid=page=>page===null || Object.hasOwn(labels,page) || Object.hasOwn(projects,page);
  const legacyPages = {work:'data',skills:'about',awards:'beyond'};
  const fragmentPage = location.hash.slice(1);
  const entryPage = legacyPages[fragmentPage] || fragmentPage;
  root.querySelectorAll('.vk').forEach(app=>{
    const key=app.dataset.version;
    const s={page:valid(entryPage)?entryPage:'home',history:[]};
    const pageEl=app.querySelector('.page');
    const nav=app.querySelector('.folders');
    const win=app.querySelector('.window');
    const folders=key==='balanced'?['about','research','data','beyond','writing','cv','contact']:folderOrder;
    nav.innerHTML=folders.map(id=>btn(id,`<span class="folder" aria-hidden="true"></span><span>${labels[id]}</span>`)).join('');
    function render(moveFocus=false) {
      win.hidden=s.page===null;
      const active=projects[s.page]?.category || (s.page==='publications'?'research':pdfNames[s.page]?'cv':s.page);
      nav.querySelectorAll('button').forEach(b=>{
        if(b.dataset.page===active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
      });
      if(win.hidden){
        pageEl.replaceChildren();
        if(moveFocus)app.querySelector('.brand').focus({preventScroll:true});
        return;
      }
      win.classList.toggle('document-window',Boolean(pdfNames[s.page]));
      app.querySelector('.window-name').textContent=s.page==='home'?'welcome.txt':pdfNames[s.page]?pdfNames[s.page]+' CV.pdf':getName(s.page);
      const previous=s.history.at(-1);
      const back=s.history.length?'<button type="button" class="back cursor-interaction" data-action="back">← '+(previous===null?'Desktop':getName(previous))+'</button>':'';
      pageEl.innerHTML=back+content(s.page,key==='analytics');
      const drawing=pageEl.querySelector('canvas');
      if(drawing)drawNap(drawing);
      if(moveFocus)win.querySelector('.close').focus({preventScroll:true});
    }
    app.addEventListener('click',e=>{
      const target=e.target.closest('button[data-page],button[data-action]');
      if(!target)return;
      if(target.dataset.action==='close'){s.page=null;s.history=[];}
      else if(target.dataset.action==='back' && s.history.length){s.page=s.history.pop();}
      else if(target.dataset.page && target.dataset.page!==s.page && valid(target.dataset.page)){
        s.history.push(s.page);s.history=s.history.slice(-30);s.page=target.dataset.page;
      }else{return;}
      render(true);
      root.scrollIntoView({block:"start"});
    });
    render();
  });
  const clock=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
  const clocks=root.querySelectorAll('.desktop-clock');
  function tick() {
    const now=new Date();
    const t=clock.format(now)+' IST';
    clocks.forEach(el=>{if(el.textContent!==t){el.textContent=t;el.dateTime=now.toISOString();}});
  }
  tick();
  const timer=setInterval(()=>{if(root.isConnected)tick();else clearInterval(timer);},1000);
})();
