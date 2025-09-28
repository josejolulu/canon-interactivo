import { DocumentContent } from '../types.ts';

export const documentContent: DocumentContent = [
    { type: 'h1', content: 'EL CANON Y LA TÉCNICA IMITATIVA', slug: 'el-canon-y-la-técnica-imitativa' },
    {
        type: 'h2',
        content: '1. DEFINICIÓN Y PRINCIPIOS FUNDAMENTALES DEL CANON',
        slug: '1-definición-y-principios-fundamentales-del-canon',
        blocks: [
            { type: 'p', content: 'El canon (del griego κανών, "regla" o "norma") es una de las formas contrapuntísticas más rigurosas. Su principio estructural se basa en la imitación estricta y diferida: una melodía inicial, denominada antecedente o dux, es replicada de forma exacta por una o más voces, llamadas consecuentes o comes, que inician su intervención tras un intervalo de tiempo predeterminado.' },
            { type: 'image', path: './static/images/pagina_1_img_0.png', alt: 'Diagrama estructural de un canon a 3 voces con cadencia final.' },
            { type: 'p', content: 'El principal objetivo técnico en la escritura de un canon es el diseño de un dux que no solo posea valor melódico intrínseco, sino que también genere un contrapunto armónicamente coherente al superponerse consigo mismo. Cada decisión melódica y rítmica en el antecedente tiene una consecuencia directa en la armonía vertical resultante.' },
        ],
    },
    {
        type: 'h2',
        content: '2. PRINCIPIOS PARA LA CONSTRUCCIÓN DEL ANTECEDENTE (DUX)',
        slug: '2-principios-para-la-construcción-del-antecedente-dux',
        blocks: [
            { type: 'p', content: 'La viabilidad y calidad de un canon dependen casi en su totalidad de un diseño melódico y rítmico meticuloso en su voz principal.' },
            {
                type: 'list',
                items: [
                    '<strong>Diseño Melódico y Contorno:</strong> Se debe buscar un equilibrio entre el movimiento por grados conjuntos y los saltos. Los grados conjuntos aportan fluidez y facilidad de imitación, mientras que los saltos, si se emplean con moderación y se resuelven adecuadamente, enriquecen la línea. Es fundamental evitar melodías excesivamente disjuntas o monótonas, y resolver los saltos preferentemente por movimiento contrario o por grados conjuntos descendentes.',
                    '<strong>Variedad Rítmica y Prevención de Paralelismos:</strong> La repetición inmediata de una misma nota en el dux debe evitarse sistemáticamente, ya que puede generar octavas o quintas paralelas en la imitación. Es recomendable alternar valores rítmicos y evitar patrones demasiado predecibles, lo que ayuda a prevenir la aparición de paralelismos y a mantener el interés musical.',
                    '<strong>Control de la Armonía Implícita:</strong> El dux debe ser concebido teniendo en cuenta los intervalos armónicos que se formarán al superponerse con su propia imitación. Es fundamental prever y evitar la acumulación de disonancias no preparadas o resoluciones incorrectas, anticipando los acordes resultantes y asegurando la corrección contrapuntística.',
                ],
            },
        ],
    },
    {
        type: 'h2',
        content: '3. CLASIFICACIÓN DEL CANON SEGÚN EL INTERVALO DE IMITACIÓN',
        slug: '3-clasificación-del-canon-según-el-intervalo-de-imitación',
        blocks: [
            { type: 'p', content: 'Constituyen el punto de partida pedagógico por ser imitaciones interválicamente idénticas.' },
            { type: 'list', items: ['<strong>Al Unísono:</strong> Aunque la imitación es nota por nota, la ausencia de distancia vertical provoca frecuentes cruces de voz y exige especial atención a la independencia rítmica y melódica de las líneas.'] },
            { type: 'image', path: './static/images/pagina_2_img_0.png', alt: "Partitura del canon 'Selig, selig' de W. A. Mozart." },
            { type: 'list', items: ['<strong>A la Octava:</strong> La distancia entre las voces proporciona una gran claridad textural, facilitando la percepción de la independencia lineal y reduciendo el riesgo de cruces de voz, aunque requiere controlar cuidadosamente las quintas y octavas paralelas.'] },
            { type: 'image', path: './static/images/pagina_3_img_1.png', alt: 'Partitura de ejemplo de un Canon a la Octava.' },
            { type: 'p', content: 'Los siguientes tipos de cánones (a la 5ª o a la 4ª) son armónicamente más complejos, ya que la distancia interválica introduce nuevas posibilidades y desafíos en la gestión de la armonía y la textura.' },
            { type: 'list', items: [
                '<strong>Canon a la Quinta (Superior):</strong> El comes comienza una quinta justa por encima del dux. Esta distancia favorece la aparición de acordes de tónica y dominante, pero exige atención para evitar la acumulación de quintas paralelas y mantener la variedad armónica.',
                '<strong>Canon a la Cuarta (Superior):</strong> El comes comienza una cuarta justa por encima. La cuarta, siendo un intervalo disonante en la armonía tradicional, requiere especial cuidado en la preparación y resolución de las disonancias que puedan surgir.',
            ]},
            { type: 'image', path: './static/images/pagina_3_img_2.png', alt: 'Partitura de un Canon a la Quinta.' },
            { type: 'p', content: 'Por último, los cánones a la 2ª ó 7ª y a la 3ª ó 6ª presentan un nivel de dificultad superior, ya que la cercanía o lejanía interválica afecta directamente a la consonancia y la gestión de las disonancias.' },
            { type: 'list', items: ['<strong>A la Segunda y a la Séptima:</strong> La proximidad de las voces produce una alta densidad de disonancias, especialmente segundas y séptimas, lo que exige una planificación muy precisa para evitar choques armónicos no deseados.'] },
            { type: 'image', path: './static/images/pagina_4_img_0.png', alt: 'Partitura de un Canon a la Segunda de Mozart.' },
            { type: 'list', items: ['<strong>A la Tercera y a la Sexta:</strong> Estos cánones tienden a generar una sonoridad rica en consonancias imperfectas, como terceras y sextas, pero pueden resultar monótonos si no se introduce suficiente variedad melódica y rítmica.'] },
            { type: 'image', path: './static/images/pagina_5_img_1.png', alt: 'Partitura de un Canon a la Sexta.' },
            {
                type: 'table',
                title: 'RESUMEN DE CÁNONES POR INTERVALO DE IMITACIÓN',
                headers: ['Intervalo', 'Desafío Técnico', 'Carácter Sonoro'],
                rows: [
                    ['Octava / Unísono', 'Control de 5as/8as paralelas; gestión cruce de voces.', 'Claro, directo, puro.'],
                    ['Quinta / Cuarta', 'Mantener estabilidad tonal; gestión cambios de cualidad.', 'Robusto, dinámico.'],
                    ['Tercera / Sexta', 'Evitar monotonía armónica y paralelismos.', 'Rico, consonante.'],
                    ['Segunda / Séptima', 'Gestión estructural de altas disonancias.', 'Tenso, complejo, moderno.'],
                ],
            },
        ],
    },
    {
        type: 'h2',
        content: '4. LA CONCLUSIÓN DEL CANON: LA CADENCIA',
        slug: '4-la-conclusión-del-canon-la-cadencia',
        blocks: [{ type: 'p', content: 'La imitación estricta no suele mantenerse hasta la última nota. Es una práctica estándar introducir una coda o pequeño pasaje libre al final, permitiendo que las voces concluyan de manera conjunta y resuelvan la cadencia de forma satisfactoria. Esta libertad final facilita la resolución armónica y evita forzar la imitación en los compases conclusivos.' }],
    },
    {
        type: 'h2',
        content: '5. METODOLOGÍA DE TRABAJO Y ANÁLISIS',
        slug: '5-metodología-de-trabajo-y-análisis',
        blocks: [
            {
                type: 'ordered_list',
                items: [
                    '<strong>Diseño Preliminar del Dux:</strong> Componer una línea melódica de 4 a 8 compases, cuidando especialmente el contorno, la variedad rítmica y la previsión de los intervalos armónicos que surgirán en la imitación.',
                    '<strong>Escritura Simultánea:</strong> Trabajar compás a compás, escribiendo el dux y el comes de manera paralela para detectar y corregir posibles conflictos armónicos o melódicos desde el inicio.',
                    '<strong>Análisis Vertical y Lineal:</strong> Revisar constantemente la pieza tanto en sentido horizontal (melodía de cada voz) como vertical (armonía resultante), asegurando la corrección contrapuntística y la fluidez musical.',
                    '<strong>Identificación y Corrección de Errores:</strong> Ver los errores como una oportunidad para mejorar el diseño del dux. Si surgen problemas irresolubles, es preferible modificar la melodía principal antes que forzar soluciones poco musicales.',
                ],
            },
        ],
    },
    {
        type: 'h2',
        content: '6. RECURSOS ADICIONALES Y AUDICIONES RECOMENDADAS',
        slug: '6-recursos-adicionales-y-audiciones-recomendadas',
        blocks: [
            { type: 'h3', content: 'Recursos Online', slug: 'recursos-online' },
            {
                type: 'link_list',
                items: [
                    { text: 'Komptools Blog - "Contrapunto IX: Canon a la Octava"', url: 'https://komptools.blogspot.com/2018/11/contrapunto-ix-canon-la-octava.html' },
                    { text: 'Teoria.com - Portal interactivo de teoría musical', url: 'https://www.teoria.com/' },
                ],
            },
            { type: 'h3', content: 'Audiciones Esenciales (Vídeos)', slug: 'audiciones-esenciales-vídeos' },
            { type: 'youtube', video_id: '15ezpwCHtJs', title: 'J.S. Bach: Variaciones Goldberg, BWV 988 (ciclo de 9 cánones a todos los intervalos)', external_url: 'https://youtu.be/15ezpwCHtJs' },
            { type: 'youtube', video_id: 'Y9OUfBDIGhw', title: 'J.S. Bach: El Arte de la Fuga, BWV 1080', start: 2677 },
            { type: 'youtube', video_id: 'PcTVkOzrzQs', title: 'J.S. Bach: Ofrenda Musical, BWV 1079 (Canon perpetuus y Canones diversi)', external_url: 'https://youtu.be/PcTVkOzrzQs' },
            { type: 'youtube', video_id: 'YCp5XC2rsEM', title: 'César Franck: Sonata para violín y piano en La Mayor (Canon a la octava)', start: 1365 },
        ],
    },
];