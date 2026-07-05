import React, { useState } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User,
  Lock // <-- Importamos el ícono del candado
} from 'lucide-react';

// Base de datos oficial corregida: 24 alumnos (respetando los números de lista)
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
  { id: 20, nombre: 'Zavala Pineda Vaitiare Monserrat', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Memoriza con facilidad rimas y explicaciones verbales.', incidentes: [] },
  { id: 21, nombre: 'Zavaleta Orrostieta Elia Sofia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Comprende fácilmente lecturas de texto.', incidentes: [] },
  { id: 22, nombre: 'Lopez Venegas Rosalia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Se apoya mucho utilizando material didáctico concreto.', incidentes: [] },
  { id: 23, nombre: 'Renteria Catalan Giselle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Excelente comprensión lectora al leer en voz alta.', incidentes: [] },
  { id: 24, nombre: 'Orozco Lopez Jose De Jesus', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Requiere indicaciones visuales claras en el pizarrón.', incidentes: [] }
];

export default function App() {
  // --- NUEVO ESTADO PARA EL BLOQUEO (CONTRASEÑA) ---
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [contrasena, setContrasena] = useState('');

  // --- ESTADOS ORIGINALES DEL SISTEMA ---
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('Todos');
  const [vista, setVista] = useState('registro'); 
  const [guardado, setGuardado] = useState(false);
  
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const [incidenteNuevo, setIncidenteNuevo] = useState({ categoria: 'Conducta', detalle: '' });
  const [idAlumnoIncidente, setIdAlumnoIncidente] = useState(null);

  // --- LÓGICA DE VALIDACIÓN DE CONTRASEÑA ---
  const CONTRASENA_CORRECTA = 'Profe2026'; 

  const manejarIngreso = (e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA_CORRECTA) {
      setEstaAutenticado(true);
    } else {
      alert('Contraseña incorrecta. Intenta de nuevo.');
      setContrasena(''); // Borra la contraseña si se equivocó
    }
  };


  // --- FUNCIONES ORIGINALES ---
  const alumnosFiltrados = alumnos.filter(alumno => {
    const coincideBusqueda = alumno.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCanal = filtroCanal === 'Todos' || alumno.canal === filtroCanal;
    return coincideBusqueda && coincideCanal;
  });

  const toggleAsistencia = (id) => {
    setAlumnos(alumnos.map(al => al.id === id ? { ...al, asistencia: !al.asistencia } : al));
  };

  const toggleLugar = (id) => {
    setAlumnos(alumnos.map(al => al.id === id ? { ...al, lugar: al.lugar === 'salon' ? 'casa' : 'salon' } : al));
  };

  const toggleTarea = (id) => {
    setAlumnos(alumnos.map(al => al.id === id ? { ...al, tarea: !al.tarea } : al));
  };

  const handleGuardarEnSheets = async () => {
    setGuardado(true);
    // URL verificada del video
    const urlScript = 'https://script.google.com/macros/s/AKfycbwaILRlvuvI84N9iVF3swItyIoBFn3IpClSGkbrJV7g7RVzRCDmjPbIkFJK3hLSOCog/exec';

    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ fecha, alumnos }));

      await fetch(urlScript, {
        method: 'POST',
        mode: 'no-cors', 
        body: params     
      });
      console.log("Datos enviados a Sheets exitosamente");
    } catch (error) {
      console.error("Error al enviar:", error);
    }
    setTimeout(() => setGuardado(false), 2500);
  };

  const agregarIncidente = (id) => {
    if (!incidenteNuevo.detalle.trim()) return;

    const nuevoObj = {
      id: Date.now(),
      fecha: fecha,
      categoria: incidenteNuevo.categoria,
      detalle: incidenteNuevo.detalle
    };

    setAlumnos(alumnos.map(al => {
      if (al.id === id) {
        return { ...al, incidentes: [nuevoObj, ...al.incidentes] };
      }
      return al;
    }));

    setIncidenteNuevo({ categoria: 'Conducta', detalle: '' });
    setIdAlumnoIncidente(null);

    if (alumnoSeleccionado && alumnoSeleccionado.id === id) {
      setAlumnoSeleccionado({
        ...alumnoSeleccionado,
        incidentes: [nuevoObj, ...alumnoSeleccionado.incidentes]
      });
    }
  };

  const eliminarIncidente = (alumnoId, incidenteId) => {
    setAlumnos(alumnos.map(al => {
      if (al.id === alumnoId) {
        return { ...al, incidentes: al.incidentes.filter(inc => inc.id !== incidenteId) };
      }
      return al;
    }));

    if (alumnoSeleccionado && alumnoSeleccionado.id === alumnoId) {
      setAlumnoSeleccionado({
        ...alumnoSeleccionado,
        incidentes: alumnoSeleccionado.incidentes.filter(inc => inc.id !== incidenteId)
      });
    }
  };

  const guardarPerfilPedagogico = (id, nuevoCanal, nuevoDiag) => {
    setAlumnos(alumnos.map(al => {
      if (al.id === id) {
        return { ...al, canal: nuevoCanal, diagnostico: nuevoDiag };
      }
      return al;
    }));
    
    if (alumnoSeleccionado && alumnoSeleccionado.id === id) {
      setAlumnoSeleccionado({
        ...alumnoSeleccionado,
        canal: nuevoCanal,
        diagnostico: nuevoDiag
      });
    }
  };

  const totalAlumnos = alumnos.length;
  const presentes = alumnos.filter(a => a.asistencia).length;
  const faltas = totalAlumnos - presentes;
  const porcentajeAsistencia = totalAlumnos > 0 ? Math.round((presentes / totalAlumnos) * 100) : 0;
  const tareasCumplidas = alumnos.filter(a => a.asistencia && a.tarea).length;
  const trabajandoCasa = alumnos.filter(a => a.asistencia && a.lugar === 'casa').length;


  // =======================================================================
  // PANTALLA DE BLOQUEO (SE MUESTRA SI NO ESTÁ AUTENTICADO)
  // =======================================================================
  if (!estaAutenticado) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans w-full">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-700 shadow-sm">
            <Lock className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2 tracking-tight">Acceso Restringido</h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">Control Docente 3ro "A". Por favor, ingresa tu clave de maestro para continuar.</p>
          
          <form onSubmit={manejarIngreso} className="space-y-5">
            <input
              type="password"
              placeholder="•••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              autoFocus
              className="w-full p-4 border border-slate-200 bg-slate-50 rounded-xl outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all text-center text-xl tracking-[0.3em] font-bold text-slate-700"
            />
            <button 
              type="submit" 
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-5 h-5" /> Desbloquear Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =======================================================================
  // APLICACIÓN PRINCIPAL (SE MUESTRA SI LA CONTRASEÑA FUE CORRECTA)
  // =======================================================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-24 print:bg-white print:p-0 print:pb-0 w-full">
      
      <style>{`
        :root, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          max-width: 100% !important;
          width: 100vw !important;
          min-height: 100vh !important;
          background-color: #f8fafc !important;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-30 print:hidden w-full">
        <div className="px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                <Award className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-slate-800">Control Docente 3ro "A"</h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Optimiza tu tiempo administrativo y enfócate en educar</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="w-4 h-4 text-slate-500 mr-2" />
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-slate-700 font-bold w-28"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs de Navegación */}
      <div className="px-4 md:px-8 mt-4 flex gap-2 print:hidden w-full">
        <button
          onClick={() => setVista('registro')}
          className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            vista === 'registro' 
            ? 'bg-emerald-700 text-white shadow-md' 
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <BookOpenCheck className="w-4 h-4" />
          Pase de Lista Diario
        </button>
        <button
          onClick={() => setVista('reporte')}
          className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            vista === 'reporte' 
            ? 'bg-emerald-700 text-white shadow-md' 
            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Printer className="w-4 h-4" />
          Vista de Impresión
        </button>
      </div>

      {vista === 'registro' && (
        <section className="px-4 md:px-8 mt-4 print:hidden w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Asistencia</p>
                <p className="text-base font-extrabold text-slate-700">{porcentajeAsistencia}% <span className="text-xs font-normal text-slate-400">({presentes}/{totalAlumnos})</span></p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <UserX className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Inasistencias</p>
                <p className="text-base font-extrabold text-slate-700">{faltas} <span className="text-xs font-normal text-slate-400">alumnos</span></p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Trabajo en Casa</p>
                <p className="text-base font-extrabold text-slate-700">{trabajandoCasa} <span className="text-xs font-normal text-slate-400">hoy</span></p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tareas Entregadas</p>
                <p className="text-base font-extrabold text-slate-700">{tareasCumplidas} <span className="text-xs font-normal text-slate-400">alumnos</span></p>
              </div>
            </div>
          </div>
        </section>
      )}

      {vista === 'registro' && (
        <main className="px-4 md:px-8 mt-4 space-y-4 print:hidden w-full">
          
          <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex flex-col md:flex-row gap-2 justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="text" 
                placeholder="Buscar alumno rápido..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase whitespace-nowrap">Estilo Aprendizaje:</span>
              <select
                value={filtroCanal}
                onChange={(e) => setFiltroCanal(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold p-2 text-slate-700 outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Visual">Visual</option>
                <option value="Auditivo">Auditivo</option>
                <option value="Kinestésico">Kinestésico</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {alumnosFiltrados.length > 0 ? (
              alumnosFiltrados.map((alumno) => (
                <div 
                  key={alumno.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all flex flex-col gap-3 h-full ${
                    alumno.asistencia 
                    ? 'border-slate-100 hover:border-emerald-200' 
                    : 'border-rose-100 bg-rose-50/20'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm md:text-[15px] font-bold text-slate-800 leading-tight break-words mb-1">
                        {alumno.nombre}
                      </h2>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-full uppercase tracking-wider ${
                          alumno.canal === 'Visual' ? 'bg-blue-100 text-blue-700' :
                          alumno.canal === 'Auditivo' ? 'bg-purple-100 text-purple-700' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {alumno.canal}
                        </span>
                        <p className="text-[10px] text-slate-400 font-semibold">Número de lista: {alumno.id}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setAlumnoSeleccionado(alumno)}
                      className="p-1.5 bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors shrink-0"
                      title="Ver Perfil e Incidentes"
                    >
                      <User className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                    <button 
                      onClick={() => toggleAsistencia(alumno.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                        alumno.asistencia 
                        ? 'bg-emerald-50/70 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50' 
                        : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100/50'
                      }`}
                    >
                      {alumno.asistencia ? <UserCheck className="w-4 h-4 mb-1" /> : <UserX className="w-4 h-4 mb-1" />}
                      <span className="text-[10px] font-bold">{alumno.asistencia ? 'Presente' : 'Faltó'}</span>
                    </button>

                    <button 
                      onClick={() => toggleLugar(alumno.id)}
                      disabled={!alumno.asistencia}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                        !alumno.asistencia 
                        ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-100 text-slate-400' 
                        : alumno.lugar === 'salon'
                        ? 'bg-blue-50/70 text-blue-600 border-blue-100 hover:bg-blue-100/50'
                        : 'bg-amber-50/70 text-amber-700 border-amber-100 hover:bg-amber-100/50'
                      }`}
                    >
                      {alumno.lugar === 'salon' ? <School className="w-4 h-4 mb-1" /> : <Home className="w-4 h-4 mb-1" />}
                      <span className="text-[10px] font-bold">{alumno.lugar === 'salon' ? 'Salón' : 'Casa'}</span>
                    </button>

                    <button 
                      onClick={() => toggleTarea(alumno.id)}
                      disabled={!alumno.asistencia}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                        !alumno.asistencia 
                        ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-100 text-slate-400' 
                        : alumno.tarea
                        ? 'bg-indigo-50/70 text-indigo-700 border-indigo-100 hover:bg-indigo-100/50'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/50'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 mb-1" />
                      <span className="text-[10px] font-bold">{alumno.tarea ? 'Cumplió' : 'Pendiente'}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2.5">
                    {idAlumnoIncidente === alumno.id ? (
                      <div className="space-y-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex gap-2">
                          <select
                            value={incidenteNuevo.categoria}
                            onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, categoria: e.target.value })}
                            className="text-xs p-1 bg-white border border-slate-200 rounded-md font-bold text-slate-600 outline-none flex-1"
                          >
                            <option value="Conducta">Conducta</option>
                            <option value="Académico">Académico</option>
                            <option value="Emocional">Emocional</option>
                            <option value="Salud">Salud</option>
                            <option value="Cumplimiento">Cumplimiento</option>
                          </select>
                          <button 
                            onClick={() => setIdAlumnoIncidente(null)}
                            className="text-slate-400 hover:text-slate-600 shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          placeholder="Describe brevemente el incidente..."
                          value={incidenteNuevo.detalle}
                          onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, detalle: e.target.value })}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-md outline-none focus:border-emerald-500 resize-none h-14"
                        />
                        <button 
                          onClick={() => agregarIncidente(alumno.id)}
                          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs py-1.5 rounded-md font-bold flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Guardar Incidente
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => setIdAlumnoIncidente(alumno.id)}
                          className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-semibold"
                        >
                          <Plus className="w-3.5 h-3.5" /> Agregar Notas/Incidente
                        </button>

                        {alumno.incidentes.length > 0 && (
                          <span className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold border border-amber-100">
                            <AlertCircle className="w-3 h-3" />
                            {alumno.incidentes.length} Registrado(s)
                          </span>
                        )}
                      </div>
                    )}

                    {alumno.incidentes.length > 0 && idAlumnoIncidente !== alumno.id && (
                      <div className="mt-2 space-y-1">
                        {alumno.incidentes.slice(0, 1).map((inc) => (
                          <div key={inc.id} className="text-xs bg-slate-50/70 p-1.5 rounded border border-slate-100 flex items-start justify-between gap-2">
                            <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1 py-0.2 rounded uppercase shrink-0">
                              {inc.categoria}
                            </span>
                            <p className="flex-1 text-slate-600 truncate text-[11px]">{inc.detalle}</p>
                            <span className="text-[9px] text-slate-400 whitespace-nowrap shrink-0">{inc.fecha}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl p-8 text-center border border-slate-200">
                <p className="text-slate-500 font-medium">No se encontraron alumnos con los criterios seleccionados.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {alumnoSeleccionado && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            
            <header className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-50 text-emerald-800 rounded-xl">
                  <User className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Ficha Técnica del Alumno</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">Perfil e Historial</p>
                </div>
              </div>
              <button 
                onClick={() => setAlumnoSeleccionado(null)}
                className="p-1 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="p-5 space-y-4 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nombre del Alumno</label>
                  <p className="text-base font-extrabold text-slate-800">{alumnoSeleccionado.nombre}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Canal de Entrada</label>
                    <select
                      value={alumnoSeleccionado.canal}
                      onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, e.target.value, alumnoSeleccionado.diagnostico)}
                      className="w-full mt-1 p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                    >
                      <option value="Visual">Visual</option>
                      <option value="Auditivo">Auditivo</option>
                      <option value="Kinestésico">Kinestésico</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lugar Predilecto</label>
                    <p className="text-xs font-bold text-slate-700 mt-2 flex items-center gap-1 capitalize">
                      {alumnoSeleccionado.lugar === 'salon' ? <School className="w-4 h-4 text-blue-500" /> : <Home className="w-4 h-4 text-amber-500" />}
                      {alumnoSeleccionado.lugar === 'salon' ? 'Salón de Clase' : 'Trabajo en Casa'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Notas de Diagnóstico del Maestro</label>
                  <textarea
                    value={alumnoSeleccionado.diagnostico}
                    onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, alumnoSeleccionado.canal, e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-emerald-500 resize-none h-16 text-slate-600 leading-relaxed font-medium"
                    placeholder="Escribe anotaciones de conducta, estilo preferido de aprendizaje..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Bitácora de Notas y Eventos ({alumnoSeleccionado.incidentes.length})
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {alumnoSeleccionado.incidentes.length > 0 ? (
                    alumnoSeleccionado.incidentes.map((inc) => (
                      <div key={inc.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1 flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1.5 rounded uppercase">
                              {inc.categoria}
                            </span>
                            <span className="text-[9px] text-slate-400 font-bold">{inc.fecha}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">{inc.detalle}</p>
                        </div>
                        <button 
                          onClick={() => eliminarIncidente(alumnoSeleccionado.id, inc.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 rounded transition-all"
                          title="Eliminar registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-slate-50 rounded-lg text-xs text-slate-400 font-medium">
                      Este alumno no cuenta con incidentes registrados.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {vista === 'reporte' && (
        <main className="px-4 md:px-8 mt-6 space-y-6 w-full max-w-[1000px] mx-auto">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3 print:hidden">
            <h3 className="text-base font-bold text-slate-700 flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-700" />
              Generador de Documentos e Impresión
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Esta sección genera reportes limpios, sin colores pesados y optimizados para hojas tamaño carta. Al presionar el botón <strong>Imprimir Reporte</strong>, la interfaz adaptará los márgenes automáticamente.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" /> Imprimir Hoja Actual
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xs border border-slate-200 print:border-none print:shadow-none print:p-0">
            <header className="border-b-2 border-slate-800 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Reporte de Grupo Docente</h1>
                <p className="text-xs font-bold text-slate-700">Tercer Grado de Primaria • Grupo "A"</p>
                <p className="text-[10px] text-slate-500 font-medium">Registro Auxiliar de Evaluación Continua</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-slate-700">FECHA: {fecha}</p>
              </div>
            </header>

            <div className="grid grid-cols-3 gap-4 py-3 text-xs border-b border-slate-200 bg-slate-50/50 p-2 my-4 print:bg-slate-100">
              <div>
                <span className="font-extrabold text-slate-700 uppercase block text-[9px]">Porcentaje Asistencia</span>
                <p className="text-sm font-bold text-slate-800">{porcentajeAsistencia}% ({presentes}/{totalAlumnos})</p>
              </div>
              <div>
                <span className="font-extrabold text-slate-700 uppercase block text-[9px]">Trabajo en Casa</span>
                <p className="text-sm font-bold text-slate-800">{trabajandoCasa} Alumnos</p>
              </div>
              <div>
                <span className="font-extrabold text-slate-700 uppercase block text-[9px]">Tareas Entregadas</span>
                <p className="text-sm font-bold text-slate-800">{tareasCumplidas} Alumnos</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">I. Control Diario (Asistencia y Cumplimiento)</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-100 text-slate-700 print:bg-slate-200">
                      <th className="p-2 font-extrabold">N.L.</th>
                      <th className="p-2 font-extrabold">Nombre del Alumno</th>
                      <th className="p-2 font-extrabold text-center">Asistencia</th>
                      <th className="p-2 font-extrabold text-center">Ubicación</th>
                      <th className="p-2 font-extrabold text-center">Tarea</th>
                      <th className="p-2 font-extrabold">Canal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((al) => (
                      <tr key={al.id} className="border-b border-slate-200 hover:bg-slate-50/50">
                        <td className="p-2 font-bold text-slate-500">{al.id}</td>
                        <td className="p-2 font-extrabold text-slate-800">{al.nombre}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md ${al.asistencia ? 'bg-slate-100 text-slate-800' : 'bg-slate-300 text-slate-900 font-extrabold'}`}>
                            {al.asistencia ? 'PRESENTE' : 'FALTÓ'}
                          </span>
                        </td>
                        <td className="p-2 text-center font-bold text-slate-600 capitalize">
                          {al.asistencia ? al.lugar : 'N/A'}
                        </td>
                        <td className="p-2 text-center">
                          <span className="font-bold">
                            {al.asistencia ? (al.tarea ? 'CUMPLIÓ' : 'PENDIENTE') : 'FALTA'}
                          </span>
                        </td>
                        <td className="p-2 font-bold text-slate-600 uppercase tracking-wider text-[10px]">{al.canal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="page-break-before">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">II. Bitácora de Observaciones</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-100 text-slate-700 print:bg-slate-200">
                      <th className="p-2 font-extrabold w-1/4">Alumno</th>
                      <th className="p-2 font-extrabold w-1/6">Fecha</th>
                      <th className="p-2 font-extrabold w-1/6">Categoría</th>
                      <th className="p-2 font-extrabold">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.some(a => a.incidentes.length > 0) ? (
                      alumnos.flatMap(a => a.incidentes.map(inc => ({ nombre: a.nombre, ...inc }))).map((item) => (
                        <tr key={item.id} className="border-b border-slate-200">
                          <td className="p-2 font-extrabold text-slate-800">{item.nombre}</td>
                          <td className="p-2 text-slate-600 font-semibold">{item.fecha}</td>
                          <td className="p-2 font-bold uppercase text-[10px]">{item.categoria}</td>
                          <td className="p-2 text-slate-600 leading-relaxed italic">"{item.detalle}"</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-slate-400 font-semibold italic">
                          No hay observaciones para esta fecha.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-semibold">
              <div className="text-center w-48">
                <div className="border-t border-slate-500 pt-1 w-full text-slate-600 uppercase font-bold">Firma Docente</div>
                <p className="text-[10px]">profr. Aristeo Maya Corona</p>
              </div>
              <div className="text-center w-48">
                <div className="border-t border-slate-500 pt-1 w-full text-slate-600 uppercase font-bold">Vo. Bo. Dirección</div>
                <p className="text-[10px]">Profa. Rosa María Reynoso Gómez</p>
              </div>
            </footer>
          </div>
        </main>
      )}

      {/* Footer - Botón de guardado */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-lg z-30 print:hidden w-full">
        <div className="px-4 md:px-8 flex items-center justify-between gap-3 w-full">
          <div className="hidden md:block text-xs text-slate-400 font-bold">
            Estatus: <span className="text-emerald-700">Listo para Sincronizar en Tiempo Real</span>
          </div>
          
          <button 
            onClick={handleGuardarEnSheets}
            disabled={guardado}
            className={`flex-1 md:flex-initial py-3 px-8 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              guardado 
              ? 'bg-emerald-600 text-white' 
              : 'bg-emerald-700 text-white hover:bg-emerald-800 hover:-translate-y-0.5 shadow-md hover:shadow-lg'
            }`}
          >
            {guardado ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                ¡Guardado Exitosamente!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Día de Clase
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}