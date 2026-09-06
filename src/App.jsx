import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User,
  Lock, ShieldAlert, CloudDownload, RefreshCw
} from 'lucide-react';

// Lista oficial y depurada de los 20 alumnos (1 al 20 sin faltar ninguno)
const alumnosIniciales = [
  { id: 1, nombre: 'Carmona Hilario Dayra Nahomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Aprende mejor con ejemplos visuales y colores.', incidentes: [] },
  { id: 2, nombre: 'Burgos Mancilla Franco', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Disfruta el aprendizaje práctico y dinámico.', incidentes: [] },
  { id: 3, nombre: 'Calixto Daza Jose Guadalupe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Participa activamente al escuchar explicaciones.', incidentes: [] },
  { id: 4, nombre: 'Castillo Valle Erick Alberto', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Buena retención de textos anotados en el pizarrón.', incidentes: [] },
  { id: 5, nombre: 'Gonzalez Barrera Andrew Dennis', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Aprende muy bien a través del diálogo en clase.', incidentes: [] },
  { id: 6, nombre: 'Hernandez Benitez Naomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Organiza excelentemente sus apuntes y esquemas.', incidentes: [] },
  { id: 7, nombre: 'Hernandez Valencia Fernando Martin', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Necesita dinamismo y pausas activas en la clase.', incidentes: [] },
  { id: 8, nombre: 'Luviano Jimenez Said', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Comprende muy bien las instrucciones orales complejas.', incidentes: [] },
  { id: 9, nombre: 'Luviano Salgado Iker', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Destaca en actividades de lectura silenciosa.', incidentes: [] },
  { id: 10, nombre: 'Montor Leon Arlet Berenice', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Le gusta el trabajo en equipo y estar en movimiento.', incidentes: [] },
  { id: 11, nombre: 'Peña Molina Dulce Yamilet', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Muy atenta a las participaciones grupales.', incidentes: [] },
  { id: 12, nombre: 'Perez Pedroza Dara Betsabe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Muy receptiva a organizadores gráficos.', incidentes: [] },
  { id: 13, nombre: 'Rabadan Orrosquieta Jesus Enrique', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Aprende rápido a través del juego y retos físicos.', incidentes: [] },
  { id: 14, nombre: 'Saucedo Espinoza Alvaro Santiago', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Trabaja de forma muy ordenada en su libreta.', incidentes: [] },
  { id: 15, nombre: 'Toribio Herrera Eleazar', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Excelente coordinación motriz en las actividades.', incidentes: [] },
  { id: 16, nombre: 'Torres Aguilera Kathia Paloma', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Facilidad para aprender mediante la observación directa.', incidentes: [] },
  { id: 17, nombre: 'Zavala Pineda Vaitiare Monserrat', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Comprende fácilmente lecturas de texto.', incidentes: [] },
  { id: 18, nombre: 'Lopez Venegas Rosalia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Se apoya mucho utilizando material didáctico concreto.', incidentes: [] },
  { id: 19, nombre: 'Renteria Catalan Giselle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Excelente comprensión lectora al leer en voz alta.', incidentes: [] },
  { id: 20, nombre: 'Orozco Lopez Jose De Jesus', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Requiere indicaciones visuales claras en el pizarrón.', incidentes: [] }
];

const opcionesFaltasForm = [
  "Falta de respeto a la autoridad docente",
  "Falta de respeto a compañeros",
  "Agresión física (empujones, juegos bruscos)",
  "Uso de lenguaje inapropiado",
  "Interrupción constante del trabajo",
  "Daño al mobiliario o material",
  "Incumplimiento reiterado de tareas"
];

const CONTRASENA_CORRECTA = 'Profe2026'; 

// URL DE GOOGLE SHEETS INTACTA
const URL_GOOGLE_SCRIPT = 'https://script.google.com/macros/s/AKfycbyrW9JLKyIcbBAb3DzwXGMQXEvbL77LaWVb5HlILh1TKIOxVgkBfcQWt2BCFE1DzVBV/exec'; 

export default function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [contrasena, setContrasena] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('Todos');
  const [vista, setVista] = useState('registro'); 
  const [guardado, setGuardado] = useState(false);
  
  const [sincronizando, setSincronizando] = useState(false);
  const [mensajeSync, setMensajeSync] = useState(''); 

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [incidenteNuevo, setIncidenteNuevo] = useState({ categoria: 'Conducta', detalle: '' });
  const [idAlumnoIncidente, setIdAlumnoIncidente] = useState(null);

  const [formFormal, setFormFormal] = useState({
    idAlumno: '', lugar: 'Salón de clases', hora: '', testigos: '',
    faltasSeleccionadas: [], descripcion: '', accion: '', acuerdos: ''
  });
  const [imprimirFormal, setImprimirFormal] = useState(false);

  useEffect(() => {
    const historialGuardado = localStorage.getItem(`historial_3a_${fecha}`);
    if (historialGuardado) {
      setAlumnos(JSON.parse(historialGuardado));
    } else {
      setAlumnos(alumnosIniciales.map(al => ({
        ...al, asistencia: true, lugar: 'salon', tarea: true, incidentes: []
      })));
    }
    setMensajeSync('');
  }, [fecha]);

  const manejarIngreso = useCallback((e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA_CORRECTA) {
      setEstaAutenticado(true);
    } else {
      setErrorLogin('Contraseña incorrecta. Intenta de nuevo.');
      setContrasena(''); 
    }
  }, [contrasena]);

  const handleGuardarEnSheets = async () => {
    setGuardado(true);
    localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(alumnos));
    
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ fecha, alumnos }));
      await fetch(URL_GOOGLE_SCRIPT, { method: 'POST', mode: 'no-cors', body: params });
      setMensajeSync('¡Guardado exitoso en Hoja 1!');
    } catch (error) {
      console.error("Error al enviar a Sheets:", error);
      setMensajeSync('Error de conexión');
    }
    setTimeout(() => {
      setGuardado(false);
      setMensajeSync('');
    }, 3000);
  };

  const handleSincronizarNube = async () => {
    setSincronizando(true);
    setMensajeSync('Descargando...');
    
    try {
      const response = await fetch(`${URL_GOOGLE_SCRIPT}?fecha=${fecha}`);
      const data = await response.json();
      
      if (data.status === 'ok' && data.alumnos && data.alumnos.length > 0) {
        setAlumnos(data.alumnos);
        localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(data.alumnos));
        setMensajeSync('¡Datos sincronizados!');
      } else {
        setMensajeSync('No hay registros previos hoy');
      }
    } catch (error) {
      console.error("Error al sincronizar:", error);
      setMensajeSync('Error al sincronizar');
    }
    
    setTimeout(() => {
      setSincronizando(false);
      setMensajeSync('');
    }, 3500);
  };

  const alumnosFiltrados = useMemo(() => {
    const busquedaLower = busqueda.toLowerCase().trim();
    return alumnos.filter(alumno => 
      (filtroCanal === 'Todos' || alumno.canal === filtroCanal) &&
      (busquedaLower === '' || alumno.nombre.toLowerCase().includes(busquedaLower))
    );
  }, [alumnos, busqueda, filtroCanal]);

  const toggleAsistencia = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, asistencia: !al.asistencia } : al)), []);
  const toggleLugar = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, lugar: al.lugar === 'salon' ? 'casa' : 'salon' } : al)), []);
  const toggleTarea = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, tarea: !al.tarea } : al)), []);

  const agregarIncidente = useCallback((id) => {
    if (!incidenteNuevo.detalle.trim()) return;
    const nuevoObj = { id: Date.now(), fecha: fecha, categoria: incidenteNuevo.categoria, detalle: incidenteNuevo.detalle };
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, incidentes: [nuevoObj, ...al.incidentes] } : al));
    setIncidenteNuevo({ categoria: 'Conducta', detalle: '' });
    setIdAlumnoIncidente(null);
    setAlumnoSeleccionado(prev => prev && prev.id === id ? { ...prev, incidentes: [nuevoObj, ...prev.incidentes] } : prev);
  }, [incidenteNuevo, fecha]);

  const eliminarIncidente = useCallback((alumnoId, incidenteId) => {
    setAlumnos(prev => prev.map(al => al.id === alumnoId ? { ...al, incidentes: al.incidentes.filter(inc => inc.id !== incidenteId) } : al));
    setAlumnoSeleccionado(prev => prev && prev.id === alumnoId ? { ...prev, incidentes: prev.incidentes.filter(inc => inc.id !== incidenteId) } : prev);
  }, []);

  const guardarPerfilPedagogico = useCallback((id, nuevoCanal, nuevoDiag) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, canal: nuevoCanal, diagnostico: nuevoDiag } : al));
    setAlumnoSeleccionado(prev => prev && prev.id === id ? { ...prev, canal: nuevoCanal, diagnostico: nuevoDiag } : prev);
  }, []);

  const toggleFaltaFormal = useCallback((falta) => {
    setFormFormal(prev => ({ ...prev, faltasSeleccionadas: prev.faltasSeleccionadas.includes(falta) ? prev.faltasSeleccionadas.filter(f => f !== falta) : [...prev.faltasSeleccionadas, falta] }));
  }, []);

  const stats = useMemo(() => {
    const total = alumnos.length;
    let pres = 0, tar = 0, casa = 0;
    alumnos.forEach(a => { if (a.asistencia) { pres++; if (a.tarea) tar++; if (a.lugar === 'casa') casa++; } });
    return { total, presentes: pres, faltas: total - pres, porcentaje: total > 0 ? Math.round((pres / total) * 100) : 0, tareasCumplidas: tar, trabajandoCasa: casa };
  }, [alumnos]);

  const incidentesReporte = useMemo(() => alumnos.flatMap(a => a.incidentes.map(inc => ({ nombre: a.nombre, ...inc }))), [alumnos]);

  // Estilos globales aplicados en ambas vistas para asegurar el fondo azul claro
  // y bloquear el color autocompletado feo de Chrome/Edge
  const GlobalStyles = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
      :root, body, #root { 
        margin: 0; 
        padding: 0; 
        width: 100%; 
        min-height: 100vh;
        font-family: 'Nunito', sans-serif; 
        background-color: #eef6ff !important; 
      }
      /* Prevenir que el autocompletado ponga fondo verde/oliva/amarillo */
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active{
          -webkit-box-shadow: 0 0 0 30px white inset !important;
          -webkit-text-fill-color: #1e293b !important;
      }
      @media print {
        @page { size: letter; margin: 1.5cm 2cm; }
        body, #root { background: white !important; }
        ::-webkit-scrollbar { display: none; }
      }
    `}</style>
  );

  if (!estaAutenticado) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center p-4 w-full bg-[#eef6ff]">
        <GlobalStyles />
        <div className="bg-white p-8 md:p-10 rounded-[35px] shadow-xl max-w-md w-full text-center border-4 border-white ring-4 ring-blue-100">
          <div className="bg-[#2563eb] w-20 h-20 rounded-[26px] flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/30">
            <Lock className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-black text-[#1e293b] mb-1">Registro 3° "A"</h2>
          <p className="text-slate-500 text-sm mb-6 font-bold">Portal del Docente. Ingresa tu clave.</p>
          
          <form onSubmit={manejarIngreso} className="space-y-4">
            <input
              type="password"
              placeholder="•••••••••"
              value={contrasena}
              autoComplete="new-password"
              onChange={(e) => { setContrasena(e.target.value); setErrorLogin(''); }}
              autoFocus
              className="w-full p-4 border-2 border-blue-100 bg-white rounded-2xl outline-none focus:border-[#2563eb] transition-all text-center text-2xl tracking-[0.25em] font-black text-slate-800"
            />
            {errorLogin && <p className="text-rose-600 text-sm font-black bg-rose-50 py-2 rounded-xl">{errorLogin}</p>}
            <button 
              type="submit" 
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-4 rounded-2xl transition-transform shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              <UserCheck className="w-6 h-6" /> Acceder al Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-700 pb-36 w-full bg-[#eef6ff]">
      <GlobalStyles />
      
      {/* Barra Superior */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30 print:hidden w-full border-b-2 border-blue-100">
        <div className="px-4 md:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-[#2563eb] text-white rounded-2xl shadow-md">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#1e293b]">Control Escolar <span className="text-[#2563eb]">3° "A"</span></h1>
              <p className="text-xs font-extrabold text-slate-400">Profr. Aristeo Maya</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-blue-50 px-4 py-2.5 rounded-2xl border-2 border-blue-100">
              <Calendar className="w-5 h-5 text-[#2563eb] mr-2" />
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-slate-800 font-black cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 max-w-[1200px] mx-auto">
        
        {/* Pestañas estilo menú infantil redondeado */}
        <div className="mt-6 flex flex-wrap gap-3 print:hidden w-full">
          <button
            onClick={() => { setVista('registro'); setImprimirFormal(false); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-black transition-all ${
              vista === 'registro' 
              ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/25 -translate-y-0.5' 
              : 'bg-white text-slate-600 hover:text-[#2563eb] border-2 border-blue-100'
            }`}
          >
            <BookOpenCheck className="w-5 h-5" /> Pase de Lista
          </button>
          
          <button
            onClick={() => { setVista('reporte'); setImprimirFormal(false); }}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-black transition-all ${
              vista === 'reporte' 
              ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/25 -translate-y-0.5' 
              : 'bg-white text-slate-600 hover:text-[#2563eb] border-2 border-blue-100'
            }`}
          >
            <Printer className="w-5 h-5" /> Reporte Diario
          </button>

          <button
            onClick={() => setVista('formal')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-black transition-all ${
              vista === 'formal' 
              ? 'bg-[#f59e0b] text-white shadow-lg shadow-amber-500/25 -translate-y-0.5' 
              : 'bg-white text-slate-600 hover:text-[#f59e0b] border-2 border-blue-100'
            }`}
          >
            <ShieldAlert className="w-5 h-5" /> Bitácora / Acta
          </button>
        </div>

        {/* Tarjetas Resumen */}
        {vista === 'registro' && (
          <section className="mt-6 print:hidden w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="bg-white p-4 md:p-5 rounded-3xl shadow-sm border-2 border-blue-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><UserCheck className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-black">Asistencia</p>
                  <p className="text-xl md:text-2xl font-black text-emerald-600">{stats.porcentaje}% <span className="text-xs font-bold text-slate-400">({stats.presentes}/{stats.total})</span></p>
                </div>
              </div>
              <div className="bg-white p-4 md:p-5 rounded-3xl shadow-sm border-2 border-blue-100 flex items-center gap-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl"><UserX className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-black">Faltas</p>
                  <p className="text-xl md:text-2xl font-black text-rose-600">{stats.faltas} <span className="text-xs font-bold text-slate-400">alumnos</span></p>
                </div>
              </div>
              <div className="bg-white p-4 md:p-5 rounded-3xl shadow-sm border-2 border-blue-100 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Home className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-black">En Casa</p>
                  <p className="text-xl md:text-2xl font-black text-amber-600">{stats.trabajandoCasa} <span className="text-xs font-bold text-slate-400">hoy</span></p>
                </div>
              </div>
              <div className="bg-white p-4 md:p-5 rounded-3xl shadow-sm border-2 border-blue-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-black">Tareas</p>
                  <p className="text-xl md:text-2xl font-black text-indigo-600">{stats.tareasCumplidas} <span className="text-xs font-bold text-slate-400">entregas</span></p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lista de Alumnos */}
        {vista === 'registro' && (
          <main className="mt-6 space-y-6 print:hidden w-full">
            <div className="bg-white p-4 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full border-2 border-blue-100">
              <div className="relative flex-1 w-full max-w-lg">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-black text-slate-800 outline-none focus:border-[#2563eb] focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 font-black uppercase">Canal:</span>
                <select
                  value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)}
                  className="bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-black py-2.5 px-4 text-[#2563eb] outline-none w-full md:w-auto cursor-pointer"
                >
                  <option value="Todos">Todos</option><option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                </select>
              </div>
            </div>

            {/* AQUI ESTÁ EL AJUSTE PARA QUE NO SE VEAN AMONTONADOS: Máximo 3 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-8">
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <div 
                    key={alumno.id}
                    className={`bg-white rounded-3xl p-5 shadow-sm border-2 transition-all flex flex-col justify-between gap-4 relative hover:shadow-md ${
                      alumno.asistencia ? 'border-blue-100' : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-blue-100 text-[#2563eb] font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                          {alumno.id}
                        </span>
                        <div>
                          <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm ${
                            alumno.canal === 'Visual' ? 'bg-indigo-100 text-indigo-700' : alumno.canal === 'Auditivo' ? 'bg-pink-100 text-pink-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {alumno.canal}
                          </span>
                        </div>
                      </div>

                      <button onClick={() => setAlumnoSeleccionado(alumno)} className="p-2.5 bg-blue-50 text-slate-400 hover:text-[#2563eb] hover:bg-blue-100 rounded-xl transition-colors shrink-0" title="Ver Perfil">
                        <User className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="my-1">
                      <h2 className="text-[17px] font-black text-slate-800 leading-snug">
                        {alumno.nombre}
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <button onClick={() => toggleAsistencia(alumno.id)} className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-transform active:scale-95 shadow-sm ${alumno.asistencia ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'}`}>
                        {alumno.asistencia ? <UserCheck className="w-5 h-5 mb-1.5" /> : <UserX className="w-5 h-5 mb-1.5" />}
                        <span className="text-[10px] font-black">{alumno.asistencia ? 'PRESENTE' : 'FALTÓ'}</span>
                      </button>
                      <button onClick={() => toggleLugar(alumno.id)} disabled={!alumno.asistencia} className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-transform active:scale-95 shadow-sm ${!alumno.asistencia ? 'opacity-30 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400 shadow-none' : alumno.lugar === 'salon' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {alumno.lugar === 'salon' ? <School className="w-5 h-5 mb-1.5" /> : <Home className="w-5 h-5 mb-1.5" />}
                        <span className="text-[10px] font-black">{alumno.lugar === 'salon' ? 'SALÓN' : 'CASA'}</span>
                      </button>
                      <button onClick={() => toggleTarea(alumno.id)} disabled={!alumno.asistencia} className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-2 transition-transform active:scale-95 shadow-sm ${!alumno.asistencia ? 'opacity-30 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400 shadow-none' : alumno.tarea ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        <BookOpen className="w-5 h-5 mb-1.5" />
                        <span className="text-[10px] font-black">{alumno.tarea ? 'CUMPLIÓ' : 'NADA'}</span>
                      </button>
                    </div>

                    <div className="border-t-2 border-slate-100 pt-3.5 mt-1">
                      {idAlumnoIncidente === alumno.id ? (
                        <div className="space-y-2.5 bg-blue-50/60 p-3.5 rounded-2xl border-2 border-blue-100">
                          <div className="flex gap-2">
                            <select value={incidenteNuevo.categoria} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, categoria: e.target.value })} className="text-xs font-black p-2 bg-white border-2 border-blue-100 rounded-xl text-slate-700 outline-none flex-1">
                              <option value="Conducta">Conducta</option><option value="Académico">Académico</option><option value="Emocional">Emocional</option><option value="Salud">Salud</option>
                            </select>
                            <button onClick={() => setIdAlumnoIncidente(null)} className="text-slate-400 hover:text-rose-600 p-2 bg-white rounded-xl border-2 border-blue-100"><X className="w-4 h-4" /></button>
                          </div>
                          <textarea placeholder="Detalle de la nota..." value={incidenteNuevo.detalle} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, detalle: e.target.value })} className="w-full text-xs font-bold p-3 bg-white text-slate-700 border-2 border-blue-100 rounded-xl outline-none resize-none h-16" />
                          <button onClick={() => agregarIncidente(alumno.id)} className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs py-2.5 rounded-xl font-black flex items-center justify-center gap-1.5 shadow-sm">
                            <Plus className="w-4 h-4" /> Guardar Nota
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-1">
                          <button onClick={() => setIdAlumnoIncidente(alumno.id)} className="text-sm text-[#2563eb] hover:underline flex items-center gap-1 font-black"><Plus className="w-4 h-4" /> Nueva Nota</button>
                          {alumno.incidentes.length > 0 && <span className="flex items-center gap-1.5 text-[11px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg font-black"><AlertCircle className="w-3.5 h-3.5" /> {alumno.incidentes.length}</span>}
                        </div>
                      )}
                      {alumno.incidentes.length > 0 && idAlumnoIncidente !== alumno.id && (
                        <div className="mt-3 space-y-1.5">
                          {alumno.incidentes.slice(0, 1).map((inc) => (
                            <div key={inc.id} className="text-xs font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                              <span className="font-black text-amber-800 uppercase">{inc.categoria}:</span>
                              <p className="flex-1 text-slate-700 truncate">{inc.detalle}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-blue-50">
                  <p className="text-slate-400 font-black text-base">No se encontraron alumnos con ese nombre.</p>
                </div>
              )}
            </div>
          </main>
        )}

        {/* Modal de Ficha Técnica */}
        {alumnoSeleccionado && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-white">
              <header className="p-6 border-b-2 border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-blue-100 text-[#2563eb] rounded-2xl"><User className="w-6 h-6" /></span>
                  <div><h3 className="text-lg font-black text-slate-800">Ficha del Alumno</h3></div>
                </div>
                <button onClick={() => setAlumnoSeleccionado(null)} className="p-2 text-slate-400 hover:text-rose-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </header>

              <div className="p-6 space-y-6">
                <div className="bg-blue-50/50 p-5 rounded-2xl border-2 border-blue-100 space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-black text-slate-400">Nombre Completo</label>
                    <p className="text-lg font-black text-slate-800 leading-tight">{alumnoSeleccionado.nombre}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-black text-slate-400">Canal de Aprendizaje</label>
                      <select value={alumnoSeleccionado.canal} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, e.target.value, alumnoSeleccionado.diagnostico)} className="w-full mt-1 p-2.5 bg-white border-2 border-blue-100 rounded-xl text-sm font-black text-[#2563eb] outline-none">
                        <option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-wider font-black text-slate-400">Estado Hoy</label>
                      <div className={`mt-1 p-2.5 rounded-xl border-2 flex items-center gap-2 text-xs font-black uppercase bg-white ${alumnoSeleccionado.lugar === 'salon' ? 'text-blue-700 border-blue-200' : 'text-amber-700 border-amber-200'}`}>
                        {alumnoSeleccionado.lugar === 'salon' ? <School className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                        {alumnoSeleccionado.lugar === 'salon' ? 'En Salón' : 'En Casa'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider font-black text-slate-400">Diagnóstico Pedagógico</label>
                    <textarea value={alumnoSeleccionado.diagnostico} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, alumnoSeleccionado.canal, e.target.value)} className="w-full mt-1 p-3 text-xs font-bold bg-white text-slate-700 border-2 border-blue-100 rounded-xl outline-none h-20 resize-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2"><FileText className="w-4 h-4 text-[#2563eb]" /> Historial de Observaciones</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {alumnoSeleccionado.incidentes.length > 0 ? alumnoSeleccionado.incidentes.map((inc) => (
                      <div key={inc.id} className="p-3.5 bg-white shadow-sm rounded-2xl border-2 border-slate-100 flex justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md uppercase">{inc.categoria}</span>
                            <span className="text-[11px] font-bold text-slate-400">{inc.fecha}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-700">{inc.detalle}</p>
                        </div>
                        <button onClick={() => eliminarIncidente(alumnoSeleccionado.id, inc.id)} className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )) : (
                      <p className="text-center text-slate-400 font-bold py-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-xs">Sin registros para este alumno.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista Reporte Diario */}
        {vista === 'reporte' && (
          <main className="mt-6 space-y-6 w-full max-w-[1000px] mx-auto pb-12">
            <div className="bg-white p-4 rounded-3xl shadow-sm border-2 border-blue-100 flex justify-between items-center print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 text-[#2563eb] rounded-xl"><Printer className="w-5 h-5" /></div>
                <div><h3 className="text-base font-black text-slate-800">Reporte Diario para Imprimir</h3></div>
              </div>
              <button onClick={() => window.print()} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black text-xs px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md"><Printer className="w-4 h-4" /> Imprimir Hoja</button>
            </div>

            <div className="bg-white text-black p-10 rounded-3xl shadow-md border-2 border-blue-100 print:border-none print:shadow-none print:p-0">
              <header className="border-b-2 border-black pb-4 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 uppercase">Reporte General de Grupo</h1>
                  <p className="text-sm font-black text-[#2563eb] mt-0.5">Tercer Grado • Grupo "A"</p>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-right">
                  <span className="block text-[9px] uppercase font-black text-slate-500">FECHA</span>
                  <p className="text-sm font-black">{fecha}</p>
                </div>
              </header>

              <div className="grid grid-cols-3 gap-4 py-4 text-xs border-b border-slate-200 bg-slate-50 print:bg-white p-4 my-4 rounded-2xl print:rounded-none">
                <div><span className="font-black text-slate-500 block text-[10px] uppercase">ASISTENCIA</span><p className="text-lg font-black text-emerald-700 print:text-black">{stats.porcentaje}% ({stats.presentes}/{stats.total})</p></div>
                <div><span className="font-black text-slate-500 block text-[10px] uppercase">EN CASA</span><p className="text-lg font-black text-blue-700 print:text-black">{stats.trabajandoCasa} Alumnos</p></div>
                <div><span className="font-black text-slate-500 block text-[10px] uppercase">TAREAS RECIBIDAS</span><p className="text-lg font-black text-indigo-700 print:text-black">{stats.tareasCumplidas} Alumnos</p></div>
              </div>

              <h3 className="text-xs font-black uppercase mt-6 mb-3 border-b-2 border-black inline-block pb-0.5">I. Control de Asistencia y Tareas</h3>
              <table className="w-full text-left text-[11px] border-collapse font-bold">
                <thead><tr className="border-b-2 border-black bg-slate-100 print:bg-slate-200"><th className="p-2 w-10">N.L.</th><th className="p-2">Nombre Completo</th><th className="p-2 text-center">Asistencia</th><th className="p-2 text-center">Ubicación</th><th className="p-2 text-center">Tarea</th><th className="p-2">Canal</th></tr></thead>
                <tbody>{alumnos.map((al) => (<tr key={al.id} className="border-b border-slate-200"><td className="p-2 text-slate-400 font-black">{al.id}</td><td className="p-2 font-black text-slate-900">{al.nombre}</td><td className={`p-2 text-center font-black ${al.asistencia ? 'text-emerald-700' : 'text-rose-600'} print:text-black`}>{al.asistencia ? 'PRESENTE' : 'FALTÓ'}</td><td className="p-2 text-center">{al.asistencia ? (al.lugar === 'salon' ? 'Salón' : 'Casa') : '-'}</td><td className="p-2 text-center font-black">{al.asistencia ? (al.tarea ? 'CUMPLIÓ' : 'NADA') : '-'}</td><td className="p-2 uppercase text-[9px] text-slate-500">{al.canal}</td></tr>))}</tbody>
              </table>

              <div className="print:break-inside-avoid print:mt-8 mt-8">
                <h3 className="text-xs font-black uppercase mb-3 border-b-2 border-black inline-block pb-0.5">II. Observaciones</h3>
                <table className="w-full text-left text-[11px] border-collapse font-bold">
                  <thead><tr className="border-b-2 border-black bg-slate-100 print:bg-slate-200"><th className="p-2 w-1/4">Alumno</th><th className="p-2 w-1/6">Tipo</th><th className="p-2">Descripción</th></tr></thead>
                  <tbody>
                    {incidentesReporte.length > 0 ? incidentesReporte.map((item) => (<tr key={item.id} className="border-b border-slate-200"><td className="p-2 font-black">{item.nombre}</td><td className="p-2 uppercase text-[9px] text-amber-700">{item.categoria}</td><td className="p-2 text-slate-700">{item.detalle}</td></tr>)) : <tr><td colSpan="3" className="p-4 text-center text-slate-400 font-bold bg-slate-50">Sin observaciones hoy.</td></tr>}
                  </tbody>
                </table>
              </div>

              <footer className="print:break-inside-avoid print:mt-16 mt-16 pt-8 flex justify-around text-xs">
                <div className="text-center w-56"><div className="border-t-2 border-black pt-2 uppercase font-black text-slate-500">Firma Docente</div><p className="mt-1 font-black">Profr. Aristeo Maya Corona</p></div>
                <div className="text-center w-56"><div className="border-t-2 border-black pt-2 uppercase font-black text-slate-500">Vo. Bo. Dirección</div><p className="mt-1 font-black">Profa. Rosa M. Reynoso Gómez</p></div>
              </footer>
            </div>
          </main>
        )}

        {/* Bitácora Formal */}
        {vista === 'formal' && (
          <main className="mt-6 w-full max-w-[900px] mx-auto pb-20">
            {!imprimirFormal ? (
              <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-amber-100 print:hidden space-y-6">
                <div className="border-b-2 border-amber-50 pb-4">
                  <h2 className="text-xl font-black text-amber-600 flex items-center gap-2"><ShieldAlert className="w-6 h-6" /> Generador de Acta Oficial</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">Alumno Involucrado</label>
                    <select value={formFormal.idAlumno} onChange={e => setFormFormal({...formFormal, idAlumno: e.target.value})} className="w-full p-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm text-slate-800 outline-none font-black cursor-pointer">
                      <option value="">-- Seleccionar --</option>
                      {alumnos.map(al => <option key={al.id} value={al.id}>{al.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">Hora</label>
                    <input type="time" value={formFormal.hora} onChange={e => setFormFormal({...formFormal, hora: e.target.value})} className="w-full p-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-black outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">Lugar de los Hechos</label>
                    <input type="text" placeholder="Ej. Salón de clases..." value={formFormal.lugar} onChange={e => setFormFormal({...formFormal, lugar: e.target.value})} className="w-full p-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-bold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">Testigos</label>
                    <input type="text" placeholder="Nombres..." value={formFormal.testigos} onChange={e => setFormFormal({...formFormal, testigos: e.target.value})} className="w-full p-3.5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-bold outline-none" />
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t-2 border-slate-100">
                  <label className="text-xs uppercase font-black text-amber-600">Categorías Rápidas</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                    {opcionesFaltasForm.map((falta, idx) => (
                      <label key={idx} className="flex items-start gap-2 cursor-pointer p-1 rounded-xl">
                        <input type="checkbox" checked={formFormal.faltasSeleccionadas.includes(falta)} onChange={() => toggleFaltaFormal(falta)} className="mt-1 accent-amber-500" />
                        <span className="text-xs font-bold text-amber-900">{falta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t-2 border-slate-100">
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">1. Hechos Objetivos</label>
                    <textarea value={formFormal.descripcion} onChange={e => setFormFormal({...formFormal, descripcion: e.target.value})} className="w-full p-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-bold outline-none h-20 resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">2. Acción Inmediata</label>
                    <textarea value={formFormal.accion} onChange={e => setFormFormal({...formFormal, accion: e.target.value})} className="w-full p-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-bold outline-none h-16 resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-black text-slate-400">3. Acuerdos</label>
                    <textarea value={formFormal.acuerdos} onChange={e => setFormFormal({...formFormal, acuerdos: e.target.value})} className="w-full p-3 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm font-bold outline-none h-16 resize-none" />
                  </div>
                </div>

                <button onClick={() => { if(!formFormal.idAlumno){ alert("Selecciona un alumno."); return; } setImprimirFormal(true); }} className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-black text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25">
                  <Printer className="w-5 h-5" /> Ver e Imprimir Acta
                </button>
              </div>
            ) : (
              <div className="bg-white text-black w-full mx-auto p-12 shadow-md rounded-2xl print:p-0 print:shadow-none min-h-[1000px] border border-slate-200">
                <div className="print:hidden flex justify-between mb-6 pb-4 border-b-2 border-slate-100">
                  <button onClick={() => setImprimirFormal(false)} className="text-slate-500 font-black text-xs px-4 py-2 border-2 border-slate-200 rounded-xl">← Regresar</button>
                  <button onClick={() => window.print()} className="bg-[#f59e0b] text-white font-black text-xs px-6 py-2 rounded-xl flex items-center gap-2"><Printer className="w-4 h-4" /> Imprimir Oficial</button>
                </div>
                
                <header className="text-center mb-8 border-b-4 border-double border-slate-300 pb-6 print:break-inside-avoid">
                  <h2 className="text-lg font-black uppercase text-slate-900">Escuela Primaria "Vicente Guerrero"</h2>
                  <div className="text-[11px] font-bold text-slate-600 mt-1">
                    <p>C.C.T.: 16DPR2428N | ZONA: 307 | SECTOR: 026</p>
                    <p>Vicente Riva Palacio, San Lucas, Michoacán.</p>
                  </div>
                  <div className="mt-6">
                    <h1 className="text-2xl font-black uppercase border-b-2 border-black inline-block pb-0.5 mb-1">Acta Circunstanciada</h1>
                    <p className="text-xs font-black uppercase text-slate-700">Tercer Grado "A"</p>
                  </div>
                </header>

                <div className="space-y-5 text-xs leading-relaxed font-semibold text-slate-800">
                  <p className="text-justify leading-loose">
                    En <span className="font-black text-black">Vicente Riva Palacio, Mich.</span>, en la <span className="font-black text-black">Escuela "Vicente Guerrero"</span>, siendo las <span className="font-black text-black border-b border-black px-2">{formFormal.hora || '___:___'}</span> hrs del <span className="font-black text-black border-b border-black px-2">{fecha.split('-').reverse().join('/')}</span>, 
                    el docente <span className="font-black text-black">Profr. Aristeo Maya Corona</span> levanta acta por los hechos en <span className="font-black text-black border-b border-black px-2">{formFormal.lugar}</span>, 
                    relacionados con:
                  </p>

                  <div className="bg-slate-100 p-3.5 font-black text-base text-center uppercase border border-slate-300 print:break-inside-avoid text-black">
                    {alumnos.find(a => a.id === parseInt(formFormal.idAlumno))?.nombre}
                  </div>

                  {formFormal.testigos && <p className="print:break-inside-avoid"><span className="font-black text-black">Testigos:</span> {formFormal.testigos}</p>}
                  
                  {formFormal.faltasSeleccionadas.length > 0 && (
                    <div className="print:break-inside-avoid mt-4">
                      <h3 className="font-black uppercase text-xs mb-1 text-black">Categorías:</h3>
                      <ul className="list-disc pl-6 font-bold text-slate-700">{formFormal.faltasSeleccionadas.map(f => <li key={f}>{f}</li>)}</ul>
                    </div>
                  )}

                  <div className="print:break-inside-avoid mt-6"><h3 className="font-black uppercase text-xs mb-1 border-b border-black inline-block text-black">1. Hechos:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-1">{formFormal.descripcion}</p></div>
                  <div className="print:break-inside-avoid mt-6"><h3 className="font-black uppercase text-xs mb-1 border-b border-black inline-block text-black">2. Acción Inmediata:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-1">{formFormal.accion}</p></div>
                  <div className="print:break-inside-avoid mt-6"><h3 className="font-black uppercase text-xs mb-1 border-b border-black inline-block text-black">3. Acuerdos:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-1">{formFormal.acuerdos}</p></div>
                </div>

                <div className="print:break-inside-avoid mt-[60px] mb-[60px]">
                  <div className="grid grid-cols-2 gap-y-20 gap-x-10 text-center text-xs font-black uppercase w-full max-w-xl mx-auto pb-10 text-black">
                    <div className="flex flex-col items-center justify-end"><div className="border-t border-black pt-2 w-full">Firma Docente</div><p className="mt-1">Profr. Aristeo Maya</p></div>
                    <div className="flex flex-col items-center justify-end"><div className="border-t border-black pt-2 w-full">Vo. Bo. Dirección</div><p className="mt-1">Profa. Rosa M. Reynoso</p></div>
                    <div className="col-span-2 flex flex-col items-center justify-end mt-4"><div className="border-t border-black pt-2 w-1/2 mb-6">Firma Padre/Tutor</div><span className="text-[10px] border-b border-slate-300 px-12 pb-0.5">Nombre y firma</span></div>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {/* Barra Flotante Inferior */}
      {vista !== 'formal' && (
        <div className="fixed bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-xl border-t-2 border-blue-100 shadow-xl z-30 print:hidden w-full">
          <div className="w-full px-4 md:px-8 max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Estado de Conexión</span>
              <span className="text-xs font-black text-[#2563eb] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
                {mensajeSync || 'Conectado a Hoja 1'}
              </span>
            </div>
            
            <div className="flex w-full sm:w-auto gap-3">
              <button 
                onClick={handleSincronizarNube} disabled={sincronizando}
                className="flex-1 sm:flex-initial py-3 px-5 rounded-2xl font-black flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#2563eb] text-xs transition-transform active:scale-95"
              >
                {sincronizando ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CloudDownload className="w-4 h-4" />}
                <span>{sincronizando ? 'Descargando...' : 'Cargar de Nube'}</span>
              </button>

              <button 
                onClick={handleGuardarEnSheets} disabled={guardado}
                className="flex-1 sm:flex-initial py-3 px-7 rounded-2xl font-black flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
              >
                {guardado ? <><CheckCircle2 className="w-4 h-4" /> ¡Guardado!</> : <><Save className="w-4 h-4" /> Subir a la Nube</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}