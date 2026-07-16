import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User,
  Lock, ShieldAlert
} from 'lucide-react';

const alumnosIniciales = [
  { id: 1, nombre: 'Carmona Hilario Dayra Nahomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Aprende mejor con ejemplos visuales y colores.', incidentes: [] },
  { id: 2, nombre: 'Burgos Mancilla Franco', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Disfruta el aprendizaje práctico y dinámico.', incidentes: [] },
  { id: 3, nombre: 'Calixto Daza Jose Guadalupe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Participa activamente al escuchar explicaciones.', incidentes: [] },
  { id: 4, nombre: 'Castillo Valle Erick Alberto', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Buena retención de textos anotados en el pizarrón.', incidentes: [] },
  { id: 5, nombre: 'Dominguez Navarro Jose Alexander', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Requiere manipulación de materiales para concentrarse.', incidentes: [] },
  { id: 6, nombre: 'Gonzalez Barrera Andrew Dennis', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Aprende muy bien a través del diálogo en clase.', incidentes: [] },
  { id: 7, nombre: 'Hernandez Benitez Naomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Organiza excelentemente sus apuntes y esquemas.', incidentes: [] },
  { id: 8, nombre: 'Hernandez Valencia Fernando Martin', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Necesita dinamismo y pausas activas en la clase.', incidentes: [] },
  { id: 9, nombre: 'Jimenez Aguilera Ashley Michelle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Se apoya mucho en mapas mentales e ilustraciones.', incidentes: [] },
  { id: 10, nombre: 'Luviano Jimenez Said', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Comprende muy bien las instrucciones orales complejas.', incidentes: [] },
  { id: 11, nombre: 'Luviano Salgado Iker', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Destaca en actividades de lectura silenciosa.', incidentes: [] },
  { id: 12, nombre: 'Montor Leon Arlet Berenice', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Le gusta el trabajo en equipo y estar en movimiento.', incidentes: [] },
  { id: 13, nombre: 'Peña Molina Dulce Yamilet', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Muy atenta a las participaciones grupales.', incidentes: [] },
  { id: 14, nombre: 'Perez Pedroza Dara Betsabe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Muy receptiva a organizadores gráficos.', incidentes: [] },
  { id: 15, nombre: 'Rabadan Orrosquieta Jesus Enrique', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Aprende rápido a través del juego y retos físicos.', incidentes: [] },
  { id: 16, nombre: 'Sanchez Vega Orquidia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Capta rápido los temas en charlas y debates.', incidentes: [] },
  { id: 17, nombre: 'Saucedo Espinoza Alvaro Santiago', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Trabaja de forma muy ordenada en su libreta.', incidentes: [] },
  { id: 18, nombre: 'Toribio Herrera Eleazar', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Excelente coordinación motriz en las actividades.', incidentes: [] },
  { id: 19, nombre: 'Torres Aguilera Kathia Paloma', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Facilidad para aprender mediante la observación directa.', incidentes: [] },
  { id: 20, nombre: 'Zavaleta Orrostieta Elia Sofia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Comprende fácilmente lecturas de texto.', incidentes: [] },
  { id: 21, nombre: 'Lopez Venegas Rosalia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Se apoya mucho utilizando material didáctico concreto.', incidentes: [] },
  { id: 22, nombre: 'Renteria Catalan Giselle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Excelente comprensión lectora al leer en voz alta.', incidentes: [] },
  { id: 23, nombre: 'Orozco Lopez Jose De Jesus', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Requiere indicaciones visuales claras en el pizarrón.', incidentes: [] }
];

const opcionesFaltasForm = [
  "Falta de respeto a la autoridad docente",
  "Falta de respeto a compañeros (burlas, apodos, agresiones verbales)",
  "Agresión física (empujones, golpes, juegos bruscos)",
  "Uso de lenguaje inapropiado o groserías",
  "Interrupción constante del trabajo escolar",
  "Daño deliberado al mobiliario o material escolar",
  "Incumplimiento reiterado de tareas o material"
];

const CONTRASENA_CORRECTA = 'Profe2026'; 

export default function App() {
  // Autenticación
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [contrasena, setContrasena] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  // Estados Globales
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('Todos');
  const [vista, setVista] = useState('registro'); 
  const [guardado, setGuardado] = useState(false);
  
  // Modales e Incidentes rápidos
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [incidenteNuevo, setIncidenteNuevo] = useState({ categoria: 'Conducta', detalle: '' });
  const [idAlumnoIncidente, setIdAlumnoIncidente] = useState(null);

  // Estados para la Bitácora Formal
  const [formFormal, setFormFormal] = useState({
    idAlumno: '', lugar: 'Salón de clases', hora: '', testigos: '',
    faltasSeleccionadas: [], descripcion: '', accion: '', acuerdos: ''
  });
  const [imprimirFormal, setImprimirFormal] = useState(false);

  // Efecto: Cargar historial local al cambiar la fecha
  useEffect(() => {
    const historialGuardado = localStorage.getItem(`historial_3a_${fecha}`);
    if (historialGuardado) {
      setAlumnos(JSON.parse(historialGuardado));
    } else {
      setAlumnos(prev => prev.map(al => ({
        ...al, asistencia: true, lugar: 'salon', tarea: true, incidentes: []
      })));
    }
  }, [fecha]);

  // Manejo de Ingreso
  const manejarIngreso = useCallback((e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA_CORRECTA) {
      setEstaAutenticado(true);
    } else {
      setErrorLogin('Contraseña incorrecta. Intenta de nuevo.');
      setContrasena(''); 
    }
  }, [contrasena]);

  // Filtros optimizados con useMemo para no recalcular en cada render
  const alumnosFiltrados = useMemo(() => {
    const busquedaLower = busqueda.toLowerCase();
    return alumnos.filter(alumno => 
      (filtroCanal === 'Todos' || alumno.canal === filtroCanal) &&
      (busquedaLower === '' || alumno.nombre.toLowerCase().includes(busquedaLower))
    );
  }, [alumnos, busqueda, filtroCanal]);

  // Funciones de actualización optimizadas con useCallback y actualización funcional
  const toggleAsistencia = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, asistencia: !al.asistencia } : al));
  }, []);

  const toggleLugar = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, lugar: al.lugar === 'salon' ? 'casa' : 'salon' } : al));
  }, []);

  const toggleTarea = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, tarea: !al.tarea } : al));
  }, []);

  const agregarIncidente = useCallback((id) => {
    if (!incidenteNuevo.detalle.trim()) return;
    const nuevoObj = {
      id: Date.now(), fecha: fecha, categoria: incidenteNuevo.categoria, detalle: incidenteNuevo.detalle
    };
    
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
    setFormFormal(prev => ({
      ...prev,
      faltasSeleccionadas: prev.faltasSeleccionadas.includes(falta)
        ? prev.faltasSeleccionadas.filter(f => f !== falta)
        : [...prev.faltasSeleccionadas, falta]
    }));
  }, []);

  const handleGuardarEnSheets = async () => {
    setGuardado(true);
    localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(alumnos));
    
    const urlScript = 'https://script.google.com/macros/s/AKfycbwaILRlvuvI84N9iVF3swItyIoBFn3IpClSGkbrJV7g7RVzRCDmjPbIkFJK3hLSOCog/exec';
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ fecha, alumnos }));

      await fetch(urlScript, { method: 'POST', mode: 'no-cors', body: params });
      console.log("Datos enviados a Sheets exitosamente");
    } catch (error) {
      console.error("Error al enviar a Sheets:", error);
    }
    setTimeout(() => setGuardado(false), 2500);
  };

  // Cálculos estadísticos optimizados (solo se recalculan si cambia 'alumnos')
  const stats = useMemo(() => {
    const total = alumnos.length;
    let pres = 0, tar = 0, casa = 0;
    
    alumnos.forEach(a => {
      if (a.asistencia) {
        pres++;
        if (a.tarea) tar++;
        if (a.lugar === 'casa') casa++;
      }
    });

    return {
      total,
      presentes: pres,
      faltas: total - pres,
      porcentaje: total > 0 ? Math.round((pres / total) * 100) : 0,
      tareasCumplidas: tar,
      trabajandoCasa: casa
    };
  }, [alumnos]);

  // Lista aplanada de incidentes para el reporte optimizada
  const incidentesReporte = useMemo(() => {
    return alumnos.some(a => a.incidentes.length > 0) 
      ? alumnos.flatMap(a => a.incidentes.map(inc => ({ nombre: a.nombre, ...inc })))
      : [];
  }, [alumnos]);

  if (!estaAutenticado) {
    return (
      <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 font-sans w-full absolute inset-0">
        <div className="bg-[#151D2E] p-8 md:p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] max-w-md w-full text-center border border-slate-800">
          <div className="bg-[#00E5FF]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00E5FF] shadow-inner">
            <Lock className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">Registro 3 "A"</h2>
          <p className="text-slate-400 text-sm mb-8 font-medium">Control Docente. Por favor, ingresa tu clave maestra.</p>
          
          <form onSubmit={manejarIngreso} className="space-y-5">
            <input
              type="password"
              placeholder="•••••••••"
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value);
                setErrorLogin('');
              }}
              autoFocus
              className="w-full p-4 border border-slate-700 bg-[#0B1221] rounded-xl outline-none focus:border-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/20 transition-all text-center text-xl tracking-[0.3em] font-bold text-white shadow-inner"
            />
            {errorLogin && <p className="text-rose-400 text-xs font-bold animate-pulse">{errorLogin}</p>}
            <button 
              type="submit" 
              className="w-full bg-[#00E5FF] hover:bg-[#00b8cc] text-[#0B1221] font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-5 h-5" /> Desbloquear Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1221] font-sans text-slate-300 pb-24 print:bg-white print:text-black print:p-0 print:pb-0 w-full selection:bg-[#00E5FF] selection:text-black">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        :root, body, #root {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #0B1221;
          width: 100%;
          min-height: 100vh;
        }
        @media print {
          @page {
            size: letter;
            margin: 1.5cm 2cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: white !important;
          }
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>

      <header className="bg-[#151D2E] shadow-md border-b border-slate-800/80 sticky top-0 z-30 print:hidden w-full">
        <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg">
                <Award className="w-6 h-6" />
              </span>
              <h1 className="text-xl font-bold text-white tracking-wide">CONTROL DOCENTE <span className="text-[#00E5FF]">3° "A"</span></h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-11">Profr. Aristeo Maya Corona | Optimiza tu tiempo administrativo</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#0B1221] px-4 py-2 rounded-xl border border-slate-700 shadow-inner">
              <Calendar className="w-4 h-4 text-[#00E5FF] mr-2" />
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white font-semibold w-32 [color-scheme:dark]"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 md:px-8">
        <div className="mt-6 flex flex-wrap gap-3 print:hidden w-full max-w-3xl">
          <button
            onClick={() => { setVista('registro'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
              vista === 'registro' 
              ? 'bg-[#00E5FF] text-[#0B1221] shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
              : 'bg-[#151D2E] text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <BookOpenCheck className="w-4 h-4" /> Pase de Lista Diario
          </button>
          
          <button
            onClick={() => { setVista('reporte'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
              vista === 'reporte' 
              ? 'bg-[#00E5FF] text-[#0B1221] shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
              : 'bg-[#151D2E] text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Printer className="w-4 h-4" /> Reporte Diario
          </button>

          <button
            onClick={() => setVista('formal')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all ${
              vista === 'formal' 
              ? 'bg-amber-400 text-amber-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
              : 'bg-[#151D2E] text-slate-400 hover:text-amber-400 border border-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Bitácora Formal (Acta)
          </button>
        </div>

        {vista === 'registro' && (
          <section className="mt-6 print:hidden w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-[#00E676]/10 text-[#00E676] rounded-xl"><UserCheck className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Asistencia</p>
                  <p className="text-xl font-extrabold text-[#00E676]">{stats.porcentaje}% <span className="text-xs font-medium text-slate-500 ml-1">({stats.presentes}/{stats.total})</span></p>
                </div>
              </div>
              <div className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl"><UserX className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Inasistencias</p>
                  <p className="text-xl font-extrabold text-white">{stats.faltas} <span className="text-xs font-medium text-slate-500 ml-1">alumnos</span></p>
                </div>
              </div>
              <div className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-[#00E5FF]/10 text-[#00E5FF] rounded-xl"><Home className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Trabajo Casa</p>
                  <p className="text-xl font-extrabold text-white">{stats.trabajandoCasa} <span className="text-xs font-medium text-slate-500 ml-1">hoy</span></p>
                </div>
              </div>
              <div className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl"><BookOpen className="w-6 h-6" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Tareas Dadas</p>
                  <p className="text-xl font-extrabold text-white">{stats.tareasCumplidas} <span className="text-xs font-medium text-slate-500 ml-1">alumnos</span></p>
                </div>
              </div>
            </div>
          </section>
        )}

        {vista === 'registro' && (
          <main className="mt-6 space-y-6 print:hidden w-full">
            <div className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center w-full">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3" />
                <input 
                  type="text" placeholder="Buscar alumno..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-[#00E5FF] transition-all"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-xs text-slate-400 font-semibold uppercase">Filtro Canal:</span>
                <select
                  value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)}
                  className="bg-[#0B1221] border border-slate-700 rounded-xl text-sm font-semibold py-2.5 px-4 text-white outline-none focus:border-[#00E5FF] w-full md:w-auto"
                >
                  <option value="Todos">Todos</option><option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-5 w-full">
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <div 
                    key={alumno.id}
                    className={`bg-[#151D2E] rounded-2xl p-5 shadow-lg border transition-all flex flex-col gap-4 h-full ${
                      alumno.asistencia ? 'border-slate-800 hover:border-[#00E5FF]/50' : 'border-rose-900/50 bg-rose-950/10'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[14px] font-bold text-white leading-tight break-words mb-2">{alumno.nombre}</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                            alumno.canal === 'Visual' ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : alumno.canal === 'Auditivo' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>{alumno.canal}</span>
                          <p className="text-[10px] text-slate-500 font-medium">N.L: {alumno.id}</p>
                        </div>
                      </div>
                      <button onClick={() => setAlumnoSeleccionado(alumno)} className="p-2 bg-[#0B1221] text-slate-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 rounded-xl transition-colors shrink-0 border border-slate-800" title="Ver Perfil">
                        <User className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                      <button onClick={() => toggleAsistencia(alumno.id)} className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${alumno.asistencia ? 'bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                        {alumno.asistencia ? <UserCheck className="w-4 h-4 mb-1" /> : <UserX className="w-4 h-4 mb-1" />}
                        <span className="text-[9px] font-bold">{alumno.asistencia ? 'PRESENTE' : 'FALTÓ'}</span>
                      </button>
                      <button onClick={() => toggleLugar(alumno.id)} disabled={!alumno.asistencia} className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${!alumno.asistencia ? 'opacity-30 cursor-not-allowed bg-[#0B1221] border-slate-800 text-slate-500' : alumno.lugar === 'salon' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {alumno.lugar === 'salon' ? <School className="w-4 h-4 mb-1" /> : <Home className="w-4 h-4 mb-1" />}
                        <span className="text-[9px] font-bold">{alumno.lugar === 'salon' ? 'SALÓN' : 'CASA'}</span>
                      </button>
                      <button onClick={() => toggleTarea(alumno.id)} disabled={!alumno.asistencia} className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${!alumno.asistencia ? 'opacity-30 cursor-not-allowed bg-[#0B1221] border-slate-800 text-slate-500' : alumno.tarea ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-[#0B1221] text-slate-400 border-slate-700'}`}>
                        <BookOpen className="w-4 h-4 mb-1" />
                        <span className="text-[9px] font-bold">{alumno.tarea ? 'CUMPLIÓ' : 'NADA'}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                      {idAlumnoIncidente === alumno.id ? (
                        <div className="space-y-2 bg-[#0B1221] p-2.5 rounded-xl border border-slate-700">
                          <div className="flex gap-2">
                            <select value={incidenteNuevo.categoria} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, categoria: e.target.value })} className="text-xs p-1 bg-[#151D2E] border border-slate-700 rounded-lg text-slate-300 outline-none focus:border-[#00E5FF] flex-1">
                              <option value="Conducta">Conducta</option><option value="Académico">Académico</option><option value="Emocional">Emocional</option><option value="Salud">Salud</option><option value="Cumplimiento">Cumplimiento</option>
                            </select>
                            <button onClick={() => setIdAlumnoIncidente(null)} className="text-slate-500 hover:text-white shrink-0 bg-[#151D2E] p-1.5 rounded-lg border border-slate-700"><X className="w-4 h-4" /></button>
                          </div>
                          <textarea placeholder="Describe el incidente..." value={incidenteNuevo.detalle} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, detalle: e.target.value })} className="w-full text-xs p-2 bg-[#151D2E] text-white border border-slate-700 rounded-lg outline-none focus:border-[#00E5FF] resize-none h-12" />
                          <button onClick={() => agregarIncidente(alumno.id)} className="w-full bg-[#00E5FF] hover:bg-[#00cce6] text-[#0B1221] text-xs py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5">
                            <Plus className="w-4 h-4" /> Guardar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <button onClick={() => setIdAlumnoIncidente(alumno.id)} className="text-[10px] text-[#00E5FF] hover:text-white flex items-center gap-1 font-semibold"><Plus className="w-3 h-3" /> Agregar Nota</button>
                          {alumno.incidentes.length > 0 && <span className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-md font-bold"><AlertCircle className="w-3 h-3" /> {alumno.incidentes.length} Nota(s)</span>}
                        </div>
                      )}
                      {alumno.incidentes.length > 0 && idAlumnoIncidente !== alumno.id && (
                        <div className="mt-2 space-y-1">
                          {alumno.incidentes.slice(0, 1).map((inc) => (
                            <div key={inc.id} className="text-[10px] bg-[#0B1221] p-2 rounded-lg border border-slate-800 flex items-start gap-2">
                              <span className="font-bold text-amber-400 uppercase">{inc.categoria}:</span>
                              <p className="flex-1 text-slate-400 truncate">{inc.detalle}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-[#151D2E] rounded-2xl p-10 text-center border border-slate-800">
                  <p className="text-slate-400 font-medium">No hay alumnos que coincidan.</p>
                </div>
              )}
            </div>
          </main>
        )}

        {alumnoSeleccionado && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-[#151D2E] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700 flex flex-col">
              <header className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#151D2E] z-10">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-[#00E5FF]/10 text-[#00E5FF] rounded-xl"><User className="w-5 h-5" /></span>
                  <div><h3 className="text-base font-bold text-white">Ficha Técnica</h3><p className="text-[11px] text-slate-400">Perfil e Historial</p></div>
                </div>
                <button onClick={() => setAlumnoSeleccionado(null)} className="p-1.5 text-slate-400 hover:text-white bg-[#0B1221] rounded-full border border-slate-700"><X className="w-5 h-5" /></button>
              </header>

              <div className="p-5 space-y-5">
                <div className="bg-[#0B1221] p-5 rounded-xl border border-slate-800 space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Nombre</label>
                    <p className="text-sm font-extrabold text-white">{alumnoSeleccionado.nombre}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Canal</label>
                      <select value={alumnoSeleccionado.canal} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, e.target.value, alumnoSeleccionado.diagnostico)} className="w-full mt-1.5 p-2 bg-[#151D2E] border border-slate-700 rounded-lg text-xs font-bold text-slate-300 outline-none">
                        <option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Lugar</label>
                      <p className="text-xs font-bold text-slate-300 mt-2.5 flex items-center gap-1.5 capitalize">{alumnoSeleccionado.lugar === 'salon' ? <School className="w-4 h-4 text-[#00E5FF]" /> : <Home className="w-4 h-4 text-amber-400" />}{alumnoSeleccionado.lugar === 'salon' ? 'Salón' : 'Casa'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Notas Docente</label>
                    <textarea value={alumnoSeleccionado.diagnostico} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, alumnoSeleccionado.canal, e.target.value)} className="w-full mt-1.5 p-3 text-xs bg-[#151D2E] text-slate-300 border border-slate-700 rounded-lg outline-none h-16" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2"><FileText className="w-4 h-4 text-[#00E5FF]" /> Bitácora ({alumnoSeleccionado.incidentes.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {alumnoSeleccionado.incidentes.map((inc) => (
                      <div key={inc.id} className="p-3 bg-[#0B1221] rounded-xl border border-slate-800 flex justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded uppercase">{inc.categoria}</span>
                            <span className="text-[9px] text-slate-500">{inc.fecha}</span>
                          </div>
                          <p className="text-[11px] text-slate-300">{inc.detalle}</p>
                        </div>
                        <button onClick={() => eliminarIncidente(alumnoSeleccionado.id, inc.id)} className="text-slate-500 hover:text-rose-500 h-fit p-1 bg-[#151D2E] rounded border border-slate-700"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {vista === 'reporte' && (
          <main className="mt-6 space-y-6 w-full max-w-[1000px] mx-auto pb-10">
            <div className="bg-[#151D2E] p-5 rounded-2xl shadow-lg border border-[#00E5FF]/20 flex justify-between items-center print:hidden">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2"><Printer className="w-5 h-5 text-[#00E5FF]" /> Reporte Diario Formateado</h3>
                <p className="text-xs text-slate-400">Listo para imprimir en tamaño carta.</p>
              </div>
              <button onClick={() => window.print()} className="bg-[#00E5FF] hover:bg-[#00cce6] text-[#0B1221] font-bold text-xs px-5 py-3 rounded-xl flex gap-2 shadow-lg"><Printer className="w-4 h-4" /> Imprimir Hoja</button>
            </div>

            <div className="bg-[#151D2E] text-slate-200 p-8 rounded-2xl border border-slate-800 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
              <header className="border-b-2 border-slate-700 print:border-black pb-4 flex justify-between">
                <div>
                  <h1 className="text-lg font-bold text-white print:text-black uppercase">Reporte de Grupo Docente</h1>
                  <p className="text-xs font-bold text-[#00E5FF] print:text-slate-800">Tercer Grado de Primaria • Grupo "A"</p>
                </div>
                <p className="text-xs font-extrabold print:text-black">FECHA: {fecha}</p>
              </header>

              <div className="grid grid-cols-3 gap-4 py-3 text-xs border-b border-slate-700 print:border-slate-300 bg-[#0B1221] print:bg-slate-100 p-3 my-4">
                <div><span className="font-bold print:text-slate-600 block text-[9px]">ASISTENCIA</span><p className="text-sm font-extrabold text-[#00E676] print:text-black">{stats.porcentaje}% ({stats.presentes}/{stats.total})</p></div>
                <div><span className="font-bold print:text-slate-600 block text-[9px]">TRABAJO CASA</span><p className="text-sm font-extrabold text-[#00E5FF] print:text-black">{stats.trabajandoCasa} Alumnos</p></div>
                <div><span className="font-bold print:text-slate-600 block text-[9px]">TAREAS ENTREGADAS</span><p className="text-sm font-extrabold text-indigo-400 print:text-black">{stats.tareasCumplidas} Alumnos</p></div>
              </div>

              <h3 className="text-[11px] font-bold print:text-black uppercase mt-6 mb-2">I. Control Diario (Asistencia y Tareas)</h3>
              <table className="w-full text-left text-[11px] border-collapse">
                <thead><tr className="border-b-2 border-slate-700 print:border-black print:bg-slate-200 text-slate-400 print:text-black"><th className="p-2 font-bold w-10">N.L.</th><th className="p-2 font-bold">Nombre del Alumno</th><th className="p-2 font-bold text-center">Asistencia</th><th className="p-2 font-bold text-center">Ubicación</th><th className="p-2 font-bold text-center">Tarea</th><th className="p-2 font-bold">Canal</th></tr></thead>
                <tbody>{alumnos.map((al) => (<tr key={al.id} className="border-b border-slate-800 print:border-slate-300"><td className="p-2 print:text-slate-700">{al.id}</td><td className="p-2 font-bold print:text-black">{al.nombre}</td><td className="p-2 text-center font-bold">{al.asistencia ? 'PRESENTE' : 'FALTÓ'}</td><td className="p-2 text-center">{al.asistencia ? al.lugar : '-'}</td><td className="p-2 text-center font-bold">{al.asistencia ? (al.tarea ? 'CUMPLIÓ' : 'NADA') : '-'}</td><td className="p-2 uppercase text-[9px]">{al.canal}</td></tr>))}</tbody>
              </table>

              <div className="print:break-inside-avoid print:mt-10 mt-10">
                <h3 className="text-[11px] font-bold print:text-black uppercase mb-2">II. Bitácora de Observaciones</h3>
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead><tr className="border-b-2 print:border-black print:bg-slate-200 text-slate-400 print:text-black"><th className="p-2 font-bold w-1/4">Alumno</th><th className="p-2 font-bold w-1/6">Categoría</th><th className="p-2 font-bold">Descripción</th></tr></thead>
                  <tbody>
                    {incidentesReporte.length > 0 ? incidentesReporte.map((item) => (<tr key={item.id} className="border-b border-slate-800 print:border-slate-300"><td className="p-2 font-bold print:text-black">{item.nombre}</td><td className="p-2 font-bold uppercase text-[9px] text-amber-400 print:text-slate-800">{item.categoria}</td><td className="p-2 italic print:text-black">{item.detalle}</td></tr>)) : <tr><td colSpan="3" className="p-4 text-center italic text-slate-500">No hay observaciones.</td></tr>}
                  </tbody>
                </table>
              </div>

              <footer className="print:break-inside-avoid print:mt-16 mt-16 pt-8 border-t border-slate-700 print:border-black flex justify-between text-[11px]">
                <div className="text-center w-48"><div className="border-t border-slate-500 print:border-black pt-1 uppercase font-bold">Firma Docente</div><p className="mt-1">Profr. Aristeo Maya Corona</p></div>
                <div className="text-center w-48"><div className="border-t border-slate-500 print:border-black pt-1 uppercase font-bold">Vo. Bo. Dirección</div><p className="mt-1">Profa. Rosa María Reynoso Gómez</p></div>
              </footer>
            </div>
          </main>
        )}

        {vista === 'formal' && (
          <main className="mt-6 w-full max-w-[900px] mx-auto pb-16">
            {!imprimirFormal ? (
              <div className="bg-[#151D2E] p-6 md:p-8 rounded-2xl border border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.1)] space-y-6 print:hidden">
                <div className="border-b border-slate-700 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2"><ShieldAlert className="w-6 h-6" /> Formulario de Acta Circunstanciada</h2>
                  <p className="text-sm text-slate-400 mt-1">Llene los datos de forma objetiva. El documento final tendrá formato oficial para impresión y firmas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Alumno Involucrado principal</label>
                    <select value={formFormal.idAlumno} onChange={e => setFormFormal({...formFormal, idAlumno: e.target.value})} className="w-full p-3 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500 font-semibold">
                      <option value="">-- Seleccionar Alumno --</option>
                      {alumnos.map(al => <option key={al.id} value={al.id}>{al.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Hora del Incidente</label>
                    <input type="time" value={formFormal.hora} onChange={e => setFormFormal({...formFormal, hora: e.target.value})} className="w-full p-3 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500 [color-scheme:dark]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Lugar Exacto</label>
                    <input type="text" placeholder="Ej. Patio escolar, Salón de clases..." value={formFormal.lugar} onChange={e => setFormFormal({...formFormal, lugar: e.target.value})} className="w-full p-3 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">Testigos (Nombres separados por coma)</label>
                    <input type="text" placeholder="Si aplica..." value={formFormal.testigos} onChange={e => setFormFormal({...formFormal, testigos: e.target.value})} className="w-full p-3 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500" />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-700">
                  <label className="text-[11px] uppercase font-bold text-amber-400 block">Categorización Rápida (Seleccione las aplicables)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#0B1221] p-4 rounded-xl border border-slate-800">
                    {opcionesFaltasForm.map((falta, idx) => (
                      <label key={idx} className="flex items-start gap-2 cursor-pointer hover:bg-[#151D2E] p-1.5 rounded transition-colors">
                        <input type="checkbox" checked={formFormal.faltasSeleccionadas.includes(falta)} onChange={() => toggleFaltaFormal(falta)} className="mt-1 accent-amber-500" />
                        <span className="text-xs text-slate-300">{falta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-[10px] uppercase font-bold text-slate-500 flex justify-between">1. Descripción objetiva de los hechos <span className="text-rose-400 lowercase font-normal">*Sin adjetivos o juicios</span></label>
                  <textarea placeholder="Narre cronológicamente qué sucedió, quién inició, cómo se desarrolló..." value={formFormal.descripcion} onChange={e => setFormFormal({...formFormal, descripcion: e.target.value})} className="w-full p-4 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500 min-h-[100px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">2. Acción Correctiva Inmediata</label>
                  <textarea placeholder="Ej. Se separó a los alumnos. Se dialogó con ellos. Se aplicó reglamento interno..." value={formFormal.accion} onChange={e => setFormFormal({...formFormal, accion: e.target.value})} className="w-full p-4 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500 min-h-[80px]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">3. Acuerdos / Seguimiento</label>
                  <textarea placeholder="Ej. Cita a padres, canalización a psicología escolar, trabajo comunitario..." value={formFormal.acuerdos} onChange={e => setFormFormal({...formFormal, acuerdos: e.target.value})} className="w-full p-4 bg-[#0B1221] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-amber-500 min-h-[80px]" />
                </div>

                <button onClick={() => { if(!formFormal.idAlumno){ alert("Seleccione un alumno primero"); return; } setImprimirFormal(true); }} className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all">
                  <Printer className="w-5 h-5" /> Generar Acta Oficial Lista para Imprimir
                </button>
              </div>
            ) : (
              <div className="bg-white text-black w-full mx-auto p-10 md:p-14 shadow-2xl rounded-sm print:p-0 print:shadow-none print:w-full print:max-w-full relative min-h-[1000px]">
                
                <div className="print:hidden flex justify-between mb-8 pb-4 border-b border-slate-200">
                  <button onClick={() => setImprimirFormal(false)} className="text-slate-500 hover:text-black font-bold text-sm px-4 py-2 border border-slate-300 rounded-lg transition-colors">← Volver al Editor</button>
                  <button onClick={() => window.print()} className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm px-6 py-2 rounded-lg flex items-center gap-2 shadow-md transition-colors"><Printer className="w-4 h-4" /> Imprimir Acta Formal</button>
                </div>

                <header className="text-center mb-10 border-b-[3px] border-double border-slate-300 pb-6 print:break-inside-avoid">
                  <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">Escuela Primaria "Vicente Guerrero"</h2>
                  <div className="text-[11px] font-bold text-slate-600 mt-2 space-y-1">
                    <p>C.C.T.: 16DPR2428N</p>
                    <p>ZONA ESCOLAR: 307 &nbsp;&nbsp;&nbsp; SECTOR: 026</p>
                    <p>TURNO MATUTINO</p>
                    <p>Vicente Riva Palacio, Municipio de San Lucas, Michoacán.</p>
                  </div>
                  <div className="mt-8">
                    <h1 className="text-2xl font-black uppercase tracking-tight border-b-4 border-black inline-block pb-1 mb-2">Acta Circunstanciada de Hechos</h1>
                    <p className="text-sm font-bold uppercase mt-2">Tercer Grado &nbsp;•&nbsp; Grupo "A"</p>
                  </div>
                </header>

                <div className="space-y-6 text-sm leading-relaxed">
                  <p className="text-justify print:text-[13px] leading-loose">
                    En la localidad de <span className="font-bold">Vicente Riva Palacio, Municipio de San Lucas, Michoacán</span>, dentro de las instalaciones de la <span className="font-bold">Escuela Primaria "Vicente Guerrero"</span>, siendo las <span className="font-bold border-b border-black px-2">{formFormal.hora || '______'}</span> horas del día <span className="font-bold border-b border-black px-2">{fecha.split('-').reverse().join('/')}</span>, 
                    el docente titular <span className="font-bold">Profr. Aristeo Maya Corona</span> procede a levantar la presente acta para dejar constancia de los hechos ocurridos en <span className="font-bold border-b border-black px-2">{formFormal.lugar}</span>, 
                    relacionados con el/la alumno(a):
                  </p>

                  <div className="bg-slate-100 p-4 font-bold text-lg text-center uppercase border border-slate-300 print:break-inside-avoid">
                    {alumnos.find(a => a.id === parseInt(formFormal.idAlumno))?.nombre || 'ALUMNO NO SELECCIONADO'}
                  </div>

                  {formFormal.testigos && (
                    <p className="print:break-inside-avoid"><span className="font-bold">En presencia de los testigos:</span> {formFormal.testigos}</p>
                  )}

                  {formFormal.faltasSeleccionadas.length > 0 && (
                    <div className="print:break-inside-avoid mt-6">
                      <h3 className="font-black uppercase text-xs mb-2">Categorías de la falta aplicables:</h3>
                      <ul className="list-disc pl-8 font-bold text-slate-700 space-y-1">
                        {formFormal.faltasSeleccionadas.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="print:break-inside-avoid mt-8">
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-black inline-block">1. Descripción objetiva de los hechos:</h3>
                    <p className="whitespace-pre-wrap print:text-[13px] leading-loose text-justify mt-2">{formFormal.descripcion || 'Sin descripción detallada.'}</p>
                  </div>

                  <div className="print:break-inside-avoid mt-8">
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-black inline-block">2. Acción Correctiva Inmediata:</h3>
                    <p className="whitespace-pre-wrap print:text-[13px] leading-loose text-justify mt-2">{formFormal.accion || 'No se registraron acciones inmediatas.'}</p>
                  </div>

                  <div className="print:break-inside-avoid mt-8">
                    <h3 className="font-black uppercase text-xs mb-2 border-b border-black inline-block">3. Acuerdos y Seguimiento:</h3>
                    <p className="whitespace-pre-wrap print:text-[13px] leading-loose text-justify mt-2">{formFormal.acuerdos || 'No se registraron acuerdos específicos.'}</p>
                  </div>
                </div>

                <div className="print:break-inside-avoid print:mt-[80px] mt-[80px] mb-[60px]">
                  <p className="text-[11px] text-justify mb-24 italic text-slate-700 leading-relaxed max-w-4xl mx-auto">
                    La presente acta se lee a los involucrados, quienes manifiestan su entera conformidad con la descripción de los hechos y los acuerdos establecidos, firmando al calce para constancia y efectos legales o administrativos a que haya lugar.
                  </p>

                  <div className="grid grid-cols-2 gap-y-32 gap-x-12 text-center text-[11px] font-bold uppercase w-full max-w-3xl mx-auto pb-[60px]">
                    <div className="flex flex-col items-center justify-end">
                      <div className="border-t-[1.5px] border-black pt-2 w-full">Firma del Docente Titular</div>
                      <p className="capitalize font-medium text-slate-800 mt-1">Profr. Aristeo Maya Corona</p>
                    </div>
                    <div className="flex flex-col items-center justify-end">
                      <div className="border-t-[1.5px] border-black pt-2 w-full">Vo. Bo. Dirección Escolar</div>
                      <p className="capitalize font-medium text-slate-800 mt-1">Profa. Rosa María Reynoso Gómez</p>
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-end mt-4">
                      <div className="border-t-[1.5px] border-black pt-2 w-3/5 mb-8">Enterado: Firma del Padre, Madre o Tutor</div>
                      <span className="capitalize font-medium text-slate-600 text-[10px] border-b border-slate-300 px-16 pb-1">Nombre completo y firma</span>
                    </div>
                  </div>
                </div>

                <div className="hidden print:block fixed bottom-0 left-0 right-0 text-center text-[8px] text-slate-500 font-bold uppercase border-t border-slate-300 pt-2 bg-white pb-3 w-full">
                  Acta Circunstanciada de Hechos &nbsp;|&nbsp; Esc. Prim. Vicente Guerrero &nbsp;|&nbsp; C.C.T. 16DPR2428N
                  <br/>
                  <span className="text-[7px] font-normal tracking-widest mt-1 block">Documento Oficial • Hoja de uso interno y confidencial</span>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {vista !== 'formal' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0B1221]/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-30 print:hidden w-full">
          <div className="w-full px-4 md:px-8 flex items-center justify-between gap-4">
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estatus del Servidor</span>
              <span className="text-[#00E5FF] text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                Historial Local + Conexión a Google Sheets
              </span>
            </div>
            
            <button 
              onClick={handleGuardarEnSheets} disabled={guardado}
              className={`flex-1 md:flex-initial py-3.5 px-10 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm tracking-wide ${guardado ? 'bg-[#00E676] text-[#0B1221]' : 'bg-[#00E676] text-[#0B1221] hover:bg-[#00c766] hover:-translate-y-0.5 shadow-[0_0_20px_rgba(0,230,118,0.3)]'}`}
            >
              {guardado ? <><CheckCircle2 className="w-5 h-5 animate-bounce" /> ¡Guardando en Sheets...!</> : <><Save className="w-5 h-5" /> GUARDAR EN GOOGLE SHEETS</>}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}