// WhatsApp da empresa: DDI + DDD + número, só dígitos
const WHATSAPP = "5512996293012";
const MSG_PADRAO = "Olá, Balão Mágico! Vim pelo site e gostaria de um orçamento para minha festa.";
document.querySelectorAll(".wa").forEach(el => {
  const msg = el.dataset.msg || MSG_PADRAO;
  el.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  el.target = "_blank"; el.rel = "noopener";
});
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
onScroll(); addEventListener("scroll", onScroll, { passive: true });
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
document.getElementById("ano").textContent = new Date().getFullYear();

// ===== Conteúdo editável =====
// Fotos: coloque em fotos/<nome>.jpg (ou mude "img"). Sem foto, aparece o emoji.
const BRINQUEDOS = [
  {nome:"Pula-pula", emoji:"🏰", cor:"#1f5fd1", img:"pula-pula", desc:"Diversão garantida para pular à vontade, com montagem no local."},
  {nome:"Piscina de bolinhas", emoji:"🎱", cor:"#ee1c25", img:"piscina-bolinhas", desc:"Mergulho colorido para os pequenos brincarem com segurança."},
  {nome:"Cama elástica", emoji:"🤸", cor:"#2fa83a", img:"cama-elastica", desc:"Saltos e risadas para crianças e adolescentes."},
  {nome:"Tobogã inflável", emoji:"🛝", cor:"#f7941d", img:"toboga", desc:"Escorregador para animar a festa do início ao fim."},
  {nome:"Mini playground", emoji:"🎠", cor:"#1a2a8a", img:"playground", desc:"Espaço para brincar e se movimentar, ideal para festas infantis."}
];
const CARRINHOS = [
  {nome:"Carrinho de pipoca", emoji:"🍿", cor:"#ee1c25", img:"carrinho-pipoca", desc:"Pipoca quentinha e crocante servida na hora."},
  {nome:"Carrinho de algodão-doce", emoji:"🍭", cor:"#f06fa8", img:"carrinho-algodao", desc:"Algodão-doce colorido que encanta a criançada."},
  {nome:"Carrinho de churros", emoji:"🥖", cor:"#f7941d", img:"carrinho-churros", desc:"Churros recheados feitos na hora para os convidados."},
  {nome:"Maçã do amor", emoji:"🍎", cor:"#2fa83a", img:"maca-do-amor", desc:"Docinho clássico de festa, com cobertura brilhante."},
  {nome:"Cachorro-quente", emoji:"🌭", cor:"#1f5fd1", img:"cachorro-quente", desc:"Lanche prático para matar a fome de toda a turma."}
];
// Preços por quantidade de convidados: [até 100, até 150, até 200]. TROQUE pelos valores reais.
const QTD = [100, 150, 200];
const SERVICOS = [
  {nome:"Locação de atrativos", cor:"red", desc:"Brinquedos, barracas e carrinhos para festas e eventos em geral.", preco:[500, 700, 900]},
  {nome:"Festas infantis", cor:"blue", desc:"Animação e diversão para aniversários e comemorações das crianças.", preco:[600, 800, 1000]},
  {nome:"Empresas e comércios", cor:"green", desc:"Atrativos para ações, inaugurações e confraternizações.", preco:[700, 900, 1200]},
  {nome:"Igrejas", cor:"orange", desc:"Estrutura e diversão para festas e eventos da comunidade.", preco:[450, 650, 850]},
  {nome:"Decoração com balões", cor:"yellow", desc:"Arcos de balões para deixar o espaço ainda mais colorido.", preco:[300, 450, 600]}
];
const brl = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:0});
const zap = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

function renderRail(id, lista, tipo){
  document.getElementById("rail-"+id).innerHTML = lista.map(i => `
    <article class="item" style="--c:${i.cor}">
      <div class="media"><span class="ph">adicionar imagem</span><img src="fotos/${i.img}.jpg" alt="${i.nome}" loading="lazy" onerror="this.remove()"></div>
      <div class="body"><h4>${i.nome}</h4><p>${i.desc}</p>
      <a class="btn btn-sm btn-green" style="margin-top:14px" target="_blank" rel="noopener" href="${zap(`Olá, Balão Mágico! Quero saber sobre ${tipo}: ${i.nome}.`)}">Quero este</a></div>
    </article>`).join("");
}
renderRail("toys", BRINQUEDOS, "o brinquedo");
renderRail("carts", CARRINHOS, "o carrinho");
document.querySelectorAll(".arrow").forEach(b => b.addEventListener("click", () => {
  const r = document.getElementById("rail-"+b.dataset.rail);
  r.scrollBy({left: b.dataset.dir * (r.clientWidth * .8), behavior:"smooth"});
}));

document.getElementById("svc-grid").innerHTML = SERVICOS.map((s,i) => `
  <article class="card svc c-${s.cor}" data-i="${i}">
    <h3>${s.nome}</h3><p>${s.desc}</p>
    <fieldset class="opts"><legend class="sr" style="position:absolute;left:-9999px">Quantidade de pessoas</legend>
      ${QTD.map((q,k) => `<label><input type="radio" name="q${i}" value="${k}" ${k===0?"checked":""}><span>Até ${q}<b>${brl(s.preco[k])}</b></span></label>`).join("")}
    </fieldset>
    <a class="btn btn-green btn-sm" target="_blank" rel="noopener" href="#">Pedir no WhatsApp</a>
  </article>`).join("");
document.querySelectorAll(".svc").forEach(card => {
  const s = SERVICOS[card.dataset.i], a = card.querySelector(".btn");
  const upd = () => {
    const k = +card.querySelector("input:checked").value;
    a.href = zap(`Olá, Balão Mágico! Quero um orçamento de ${s.nome} para até ${QTD[k]} pessoas (${brl(s.preco[k])}).`);
  };
  card.addEventListener("change", upd); upd();
});