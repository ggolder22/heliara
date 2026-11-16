// Heliara One — landing de producto
// WhatsApp de ventas (Martín Samamé), formato wa.me sin "+". Si cambia, editar acá y en los enlaces del HTML.
const WHATSAPP = '5492645156300';

document.getElementById('year').textContent = new Date().getFullYear();

// Formulario → abre WhatsApp con la consulta armada (sitio estático, sin backend).
const form = document.getElementById('form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let firstInvalid = null;

  ['nombre', 'localidad'].forEach((name) => {
    const el = form.elements[name];
    const ok = el.value.trim() !== '';
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (!ok && !firstInvalid) firstInvalid = el;
  });

  if (firstInvalid) {
    note.textContent = 'Completá tu nombre y localidad para continuar.';
    note.classList.add('is-error');
    firstInvalid.focus();
    return;
  }
  note.textContent = 'Se abre WhatsApp con tu consulta lista para enviar.';
  note.classList.remove('is-error');

  const text = [
    'Hola Martín, quiero un presupuesto de Heliara One.',
    '',
    `Nombre: ${data.get('nombre').trim()}`,
    `Localidad: ${data.get('localidad').trim()}`,
    `Lugar de instalación: ${data.get('lugar')}`,
    `Cantidad de equipos: ${data.get('cantidad') || 1}`,
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
