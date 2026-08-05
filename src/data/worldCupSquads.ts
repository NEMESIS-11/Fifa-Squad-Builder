import { WorldCupSquad, WorldCupYear, Player, PositionCode } from '../types';
import { canPlayerPlayPosition } from './formations';

/**
 * World Cup Roster Database spanning 1970 to 2022.
 * Includes authentic World Cup squads with realistic ratings, positions, squad numbers, and clubs.
 */

// Flag Emoji helper map
export const COUNTRY_FLAGS: Record<string, string> = {
  'Brazil': '🇧🇷',
  'Argentina': '🇦🇷',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'West Germany': '🇩🇪',
  'East Germany': '🇩🇪',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Netherlands': '🇳🇱',
  'Portugal': '🇵🇹',
  'Croatia': '🇭🇷',
  'Uruguay': '🇺🇾',
  'Belgium': '🇧🇪',
  'Colombia': '🇨🇴',
  'Mexico': '🇲🇽',
  'Morocco': '🇲🇦',
  'USA': '🇺🇸',
  'Japan': '🇯🇵',
  'South Korea': '🇰🇷',
  'Ghana': '🇬🇭',
  'Nigeria': '🇳🇬',
  'Cameroon': '🇨🇲',
  'Senegal': '🇸🇳',
  'Chile': '🇨🇱',
  'Poland': '🇵🇱',
  'Sweden': '🇸🇪',
  'Denmark': '🇩🇰',
  'Turkey': '🇹🇷',
  'Romania': '🇷🇴',
  'Bulgaria': '🇧🇬',
  'Costa Rica': '🇨🇷',
  'Ecuador': '🇪🇨',
  'Paraguay': '🇵🇾',
  'Czech Republic': '🇨🇿',
  'Czechoslovakia': '🇨🇿',
  'Ukraine': '🇺🇦',
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Australia': '🇦🇺',
  'Switzerland': '🇨🇭',
  'Saudi Arabia': '🇸🇦',
  'Algeria': '🇩🇿',
  'Iran': '🇮🇷',
  'Ivory Coast': '🇨🇮',
  'Soviet Union': '🇷🇺',
  'Yugoslavia': '🇷🇸',
  'Northern Ireland': '🇬🇧',
  'Honduras': '🇭🇳',
  'Kuwait': '🇰🇼',
  'El Salvador': '🇸🇻',
  'New Zealand': '🇳🇿',
  'Iraq': '🇮🇶',
  'South Africa': '🇿🇦',
  'Slovakia': '🇸🇰',
  'Greece': '🇬🇷',
  'Norway': '🇳🇴',
  'Bolivia': '🇧🇴',
  'Jamaica': '🇯🇲',
  'Tunisia': '🇹🇳',
  'Slovenia': '🇸🇮',
  'China': '🇨🇳',
  'Angola': '🇦🇴',
  'Trinidad and Tobago': '🇹🇹',
  'Serbia': '🇷🇸',
  'Serbia and Montenegro': '🇷🇸',
  'Togo': '🇹🇬',
  'North Korea': '🇰🇵',
  'Bosnia and Herzegovina': '🇧🇦',
  'Russia': '🇷🇺',
  'Iceland': '🇮🇸',
  'Panama': '🇵🇦',
  'Egypt': '🇪🇬',
  'Canada': '🇨🇦',
  'Qatar': '🇶🇦',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Austria': '🇦🇹',
  'Peru': '🇵🇪',
  'Israel': '🇮🇱',
  'Haiti': '🇭🇹',
  'Zaire': '🇨🇩',
  'UAE': '🇦🇪',
  'Republic of Ireland': '🇮🇪',
};

export const WORLD_CUP_YEARS: WorldCupYear[] = [
  1970, 1974, 1978, 1982, 1986, 1990,
  1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022
];

function p(
  id: string,
  name: string,
  country: string,
  year: WorldCupYear,
  primary: PositionCode,
  rating: number,
  isGK = false,
  secondaries: PositionCode[] = [],
  num?: number,
  club?: string
): Player {
  return {
    id,
    name,
    country,
    countryCode: COUNTRY_FLAGS[country] || '🏳️',
    year,
    primaryPosition: primary,
    secondaryPositions: secondaries,
    overallRating: rating,
    isGoalkeeper: isGK,
    squadNumber: num,
    club
  };
}

export const WORLD_CUP_SQUADS: WorldCupSquad[] = [
  // 1970 World Cup (Mexico)
  {
    year: 1970,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'Mexico',
    players: [
      p('br-70-1', 'Félix', 'Brazil', 1970, 'GK', 82, true, [], 1, 'Fluminense'),
      p('br-70-2', 'Carlos Alberto', 'Brazil', 1970, 'RB', 95, false, ['CB', 'RWB'], 4, 'Santos'),
      p('br-70-3', 'Piazza', 'Brazil', 1970, 'CB', 86, false, ['CDM'], 3, 'Cruzeiro'),
      p('br-70-4', 'Brito', 'Brazil', 1970, 'CB', 84, false, [], 2, 'Flamengo'),
      p('br-70-5', 'Everaldo', 'Brazil', 1970, 'LB', 84, false, [], 16, 'Grêmio'),
      p('br-70-6', 'Clodoaldo', 'Brazil', 1970, 'CDM', 88, false, ['CM'], 5, 'Santos'),
      p('br-70-7', 'Gérson', 'Brazil', 1970, 'CM', 94, false, ['CAM'], 8, 'São Paulo'),
      p('br-70-8', 'Jairzinho', 'Brazil', 1970, 'RW', 96, false, ['RM', 'ST'], 7, 'Botafogo'),
      p('br-70-9', 'Rivellino', 'Brazil', 1970, 'LW', 93, false, ['CAM', 'LM'], 11, 'Corinthians'),
      p('br-70-10', 'Pelé', 'Brazil', 1970, 'ST', 99, false, ['CF', 'CAM'], 10, 'Santos'),
      p('br-70-11', 'Tostão', 'Brazil', 1970, 'CF', 92, false, ['ST', 'CAM'], 9, 'Cruzeiro'),
      p('br-70-12', 'Paulo César', 'Brazil', 1970, 'LW', 83, false, ['LM', 'RW'], 18, 'Botafogo'),
    ]
  },
  {
    year: 1970,
    country: 'West Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'Mexico',
    players: [
      p('wg-70-1', 'Sepp Maier', 'West Germany', 1970, 'GK', 90, true, [], 1, 'Bayern Munich'),
      p('wg-70-2', 'Berti Vogts', 'West Germany', 1970, 'RB', 89, false, ['CB'], 2, 'Mönchengladbach'),
      p('wg-70-3', 'Franz Beckenbauer', 'West Germany', 1970, 'CB', 96, false, ['CDM', 'CM'], 5, 'Bayern Munich'),
      p('wg-70-4', 'Karl-Heinz Schnellinger', 'West Germany', 1970, 'CB', 88, false, ['LB'], 3, 'AC Milan'),
      p('wg-70-5', 'Horst-Dieter Höttges', 'West Germany', 1970, 'LB', 83, false, ['RB'], 4, 'Werder Bremen'),
      p('wg-70-6', 'Wolfgang Overath', 'West Germany', 1970, 'CM', 91, false, ['CAM'], 12, '1. FC Köln'),
      p('wg-70-7', 'Siegfried Held', 'West Germany', 1970, 'LM', 82, false, ['LW'], 10, 'Borussia Dortmund'),
      p('wg-70-8', 'Uwe Seeler', 'West Germany', 1970, 'ST', 89, false, ['CF'], 9, 'Hamburger SV'),
      p('wg-70-9', 'Gerd Müller', 'West Germany', 1970, 'ST', 97, false, ['CF'], 13, 'Bayern Munich'),
      p('wg-70-10', 'Jürgen Grabowski', 'West Germany', 1970, 'RW', 86, false, ['RM'], 14, 'Eintracht Frankfurt'),
    ]
  },
  {
    year: 1970,
    country: 'Italy',
    countryCode: '🇮🇹',
    flagEmoji: '🇮🇹',
    hostCountry: 'Mexico',
    players: [
      p('it-70-1', 'Enrico Albertosi', 'Italy', 1970, 'GK', 87, true, [], 1, 'Cagliari'),
      p('it-70-2', 'Tarcisio Burgnich', 'Italy', 1970, 'RB', 88, false, ['CB'], 2, 'Inter Milan'),
      p('it-70-3', 'Giacinto Facchetti', 'Italy', 1970, 'LB', 93, false, ['LWB'], 3, 'Inter Milan'),
      p('it-70-4', 'Roberto Rosato', 'Italy', 1970, 'CB', 85, false, [], 8, 'AC Milan'),
      p('it-70-5', 'Pierluigi Cera', 'Italy', 1970, 'CB', 85, false, ['CDM'], 10, 'Cagliari'),
      p('it-70-6', 'Mario Bertini', 'Italy', 1970, 'CDM', 84, false, ['CM'], 15, 'Inter Milan'),
      p('it-70-7', 'Giancarlo De Sisti', 'Italy', 1970, 'CM', 85, false, [], 16, 'Fiorentina'),
      p('it-70-8', 'Sandro Mazzola', 'Italy', 1970, 'CAM', 91, false, ['RW', 'CF'], 14, 'Inter Milan'),
      p('it-70-9', 'Luigi Riva', 'Italy', 1970, 'ST', 93, false, ['LW'], 11, 'Cagliari'),
      p('it-70-10', 'Gianni Rivera', 'Italy', 1970, 'CAM', 93, false, ['CM'], 19, 'AC Milan'),
      p('it-70-11', 'Roberto Boninsegna', 'Italy', 1970, 'ST', 87, false, ['CF'], 20, 'Inter Milan'),
    ]
  },
  {
    year: 1970,
    country: 'England',
    countryCode: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hostCountry: 'Mexico',
    players: [
      p('eng-70-1', 'Gordon Banks', 'England', 1970, 'GK', 94, true, [], 1, 'Stoke City'),
      p('eng-70-2', 'Tommy Wright', 'England', 1970, 'RB', 83, false, [], 2, 'Everton'),
      p('eng-70-3', 'Terry Cooper', 'England', 1970, 'LB', 86, false, ['LWB'], 3, 'Leeds United'),
      p('eng-70-4', 'Bobby Moore', 'England', 1970, 'CB', 95, false, ['CDM'], 6, 'West Ham United'),
      p('eng-70-5', 'Brian Labone', 'England', 1970, 'CB', 84, false, [], 5, 'Everton'),
      p('eng-70-6', 'Alan Mullery', 'England', 1970, 'CDM', 85, false, ['CM'], 4, 'Tottenham Hotspur'),
      p('eng-70-7', 'Bobby Charlton', 'England', 1970, 'CAM', 92, false, ['CM', 'CF'], 9, 'Manchester United'),
      p('eng-70-8', 'Martin Peters', 'England', 1970, 'CM', 87, false, ['LM'], 11, 'Tottenham Hotspur'),
      p('eng-70-9', 'Francis Lee', 'England', 1970, 'RW', 85, false, ['ST'], 7, 'Manchester City'),
      p('eng-70-10', 'Geoff Hurst', 'England', 1970, 'ST', 86, false, ['CF'], 10, 'West Ham United'),
      p('eng-70-11', 'Alan Ball', 'England', 1970, 'RM', 87, false, ['CM'], 8, 'Everton'),
    ]
  },

  // 1974 World Cup (West Germany)
  {
    year: 1974,
    country: 'Netherlands',
    countryCode: '🇳🇱',
    flagEmoji: '🇳🇱',
    hostCountry: 'West Germany',
    players: [
      p('ned-74-1', 'Jan Jongbloed', 'Netherlands', 1974, 'GK', 81, true, [], 8, 'FC Amsterdam'),
      p('ned-74-2', 'Wim Suurbier', 'Netherlands', 1974, 'RB', 87, false, ['RWB'], 20, 'Ajax'),
      p('ned-74-3', 'Ruud Krol', 'Netherlands', 1974, 'LB', 92, false, ['CB', 'LWB'], 12, 'Ajax'),
      p('ned-74-4', 'Arie Haan', 'Netherlands', 1974, 'CB', 88, false, ['CDM', 'CM'], 2, 'Ajax'),
      p('ned-74-5', 'Wim Rijsbergen', 'Netherlands', 1974, 'CB', 84, false, [], 17, 'Feyenoord'),
      p('ned-74-6', 'Wim Jansen', 'Netherlands', 1974, 'CDM', 86, false, ['CM'], 6, 'Feyenoord'),
      p('ned-74-7', 'Johan Neeskens', 'Netherlands', 1974, 'CM', 94, false, ['CDM', 'CAM'], 13, 'Ajax'),
      p('ned-74-8', 'Willem van Hanegem', 'Netherlands', 1974, 'CM', 90, false, ['CAM'], 3, 'Feyenoord'),
      p('ned-74-9', 'Johnny Rep', 'Netherlands', 1974, 'RW', 88, false, ['ST'], 16, 'Ajax'),
      p('ned-74-10', 'Johan Cruyff', 'Netherlands', 1974, 'CF', 98, false, ['ST', 'CAM'], 14, 'Barcelona'),
      p('ned-74-11', 'Rob Rensenbrink', 'Netherlands', 1974, 'LW', 90, false, ['ST', 'LM'], 15, 'Anderlecht'),
    ]
  },
  {
    year: 1974,
    country: 'West Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'West Germany',
    players: [
      p('wg-74-1', 'Sepp Maier', 'West Germany', 1974, 'GK', 93, true, [], 1, 'Bayern Munich'),
      p('wg-74-2', 'Berti Vogts', 'West Germany', 1974, 'RB', 92, false, ['CB'], 2, 'Mönchengladbach'),
      p('wg-74-3', 'Paul Breitner', 'West Germany', 1974, 'LB', 93, false, ['CM', 'CDM'], 3, 'Bayern Munich'),
      p('wg-74-4', 'Franz Beckenbauer', 'West Germany', 1974, 'CB', 98, false, ['CDM'], 5, 'Bayern Munich'),
      p('wg-74-5', 'Georg Schwarzenbeck', 'West Germany', 1974, 'CB', 86, false, [], 4, 'Bayern Munich'),
      p('wg-74-6', 'Rainer Bonhof', 'West Germany', 1974, 'CDM', 87, false, ['CM'], 16, 'Mönchengladbach'),
      p('wg-74-7', 'Uli Hoeneß', 'West Germany', 1974, 'CAM', 88, false, ['RM', 'ST'], 14, 'Bayern Munich'),
      p('wg-74-8', 'Wolfgang Overath', 'West Germany', 1974, 'CM', 90, false, ['CAM'], 12, '1. FC Köln'),
      p('wg-74-9', 'Bernd Hölzenbein', 'West Germany', 1974, 'LW', 85, false, ['ST'], 17, 'Eintracht Frankfurt'),
      p('wg-74-10', 'Gerd Müller', 'West Germany', 1974, 'ST', 97, false, ['CF'], 13, 'Bayern Munich'),
      p('wg-74-11', 'Jürgen Grabowski', 'West Germany', 1974, 'RW', 88, false, ['RM'], 9, 'Eintracht Frankfurt'),
    ]
  },
  {
    year: 1974,
    country: 'Poland',
    countryCode: '🇵🇱',
    flagEmoji: '🇵🇱',
    hostCountry: 'West Germany',
    players: [
      p('pol-74-1', 'Jan Tomaszewski', 'Poland', 1974, 'GK', 90, true, [], 2, 'ŁKS Łódź'),
      p('pol-74-2', 'Antoni Szymanowski', 'Poland', 1974, 'RB', 88, false, [], 4, 'Wisła Kraków'),
      p('pol-74-3', 'Adam Musiał', 'Poland', 1974, 'LB', 84, false, [], 9, 'Wisła Kraków'),
      p('pol-74-4', 'Władysław Żmuda', 'Poland', 1974, 'CB', 89, false, [], 6, 'Gwardia Warsaw'),
      p('pol-74-5', 'Jerzy Gorgoń', 'Poland', 1974, 'CB', 87, false, [], 5, 'Górnik Zabrze'),
      p('pol-74-6', 'Kazimierz Deyna', 'Poland', 1974, 'CAM', 94, false, ['CM'], 12, 'Legia Warsaw'),
      p('pol-74-7', 'Henryk Kasperczak', 'Poland', 1974, 'CM', 86, false, ['CDM'], 13, 'Stal Mielec'),
      p('pol-74-8', 'Lesław Ćmikiewicz', 'Poland', 1974, 'CDM', 84, false, [], 14, 'Legia Warsaw'),
      p('pol-74-9', 'Grzegorz Lato', 'Poland', 1974, 'RW', 94, false, ['RM', 'ST'], 16, 'Stal Mielec'),
      p('pol-74-10', 'Andrzej Szarmach', 'Poland', 1974, 'ST', 89, false, ['CF'], 17, 'Górnik Zabrze'),
      p('pol-74-11', 'Robert Gadocha', 'Poland', 1974, 'LW', 88, false, ['LM'], 18, 'Legia Warsaw'),
    ]
  },

  // 1978 World Cup (Argentina)
  {
    year: 1978,
    country: 'Argentina',
    countryCode: '🇦🇷',
    flagEmoji: '🇦🇷',
    hostCountry: 'Argentina',
    players: [
      p('arg-78-1', 'Ubaldo Fillol', 'Argentina', 1978, 'GK', 92, true, [], 5, 'River Plate'),
      p('arg-78-2', 'Jorge Olguín', 'Argentina', 1978, 'RB', 85, false, ['CB'], 15, 'San Lorenzo'),
      p('arg-78-3', 'Alberto Tarantini', 'Argentina', 1978, 'LB', 88, false, ['LWB'], 20, 'Free Agent'),
      p('arg-78-4', 'Daniel Passarella', 'Argentina', 1978, 'CB', 95, false, [], 19, 'River Plate'),
      p('arg-78-5', 'Luis Galván', 'Argentina', 1978, 'CB', 85, false, [], 7, 'Talleres'),
      p('arg-78-6', 'Americo Gallego', 'Argentina', 1978, 'CDM', 87, false, ['CM'], 6, 'Newells Old Boys'),
      p('arg-78-7', 'Osvaldo Ardiles', 'Argentina', 1978, 'CM', 91, false, ['CAM'], 2, 'Huracán'),
      p('arg-78-8', 'Mario Kempes', 'Argentina', 1978, 'ST', 96, false, ['LW', 'CAM', 'CF'], 10, 'Valencia'),
      p('arg-78-9', 'Daniel Bertoni', 'Argentina', 1978, 'RW', 88, false, ['RM'], 4, 'Independiente'),
      p('arg-78-10', 'Leopoldo Luque', 'Argentina', 1978, 'ST', 89, false, ['CF'], 14, 'River Plate'),
      p('arg-78-11', 'Oscar Ortiz', 'Argentina', 1978, 'LW', 84, false, ['LM'], 16, 'River Plate'),
    ]
  },
  {
    year: 1978,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'Argentina',
    players: [
      p('br-78-1', 'Leão', 'Brazil', 1978, 'GK', 88, true, [], 1, 'Palmeiras'),
      p('br-78-2', 'Nelinho', 'Brazil', 1978, 'RB', 88, false, ['RWB'], 2, 'Cruzeiro'),
      p('br-78-3', 'Rodrigues Neto', 'Brazil', 1978, 'LB', 83, false, [], 6, 'Botafogo'),
      p('br-78-4', 'Oscar', 'Brazil', 1978, 'CB', 86, false, [], 3, 'Ponte Preta'),
      p('br-78-5', 'Amaral', 'Brazil', 1978, 'CB', 84, false, [], 4, 'Guarani'),
      p('br-78-6', 'Toninho Cerezo', 'Brazil', 1978, 'CDM', 88, false, ['CM'], 17, 'Atlético Mineiro'),
      p('br-78-7', 'Dirceu', 'Brazil', 1978, 'CM', 89, false, ['LM', 'CAM'], 11, 'Vasco da Gama'),
      p('br-78-8', 'Zico', 'Brazil', 1978, 'CAM', 95, false, ['ST', 'CM'], 8, 'Flamengo'),
      p('br-78-9', 'Gil', 'Brazil', 1978, 'RW', 83, false, [], 7, 'Botafogo'),
      p('br-78-10', 'Roberto Dinamite', 'Brazil', 1978, 'ST', 88, false, ['CF'], 20, 'Vasco da Gama'),
      p('br-78-11', 'Reinaldo', 'Brazil', 1978, 'ST', 86, false, [], 9, 'Atlético Mineiro'),
    ]
  },

  // 1982 World Cup (Spain)
  {
    year: 1982,
    country: 'Italy',
    countryCode: '🇮🇹',
    flagEmoji: '🇮🇹',
    hostCountry: 'Spain',
    players: [
      p('it-82-1', 'Dino Zoff', 'Italy', 1982, 'GK', 94, true, [], 1, 'Juventus'),
      p('it-82-2', 'Claudio Gentile', 'Italy', 1982, 'RB', 91, false, ['CB'], 6, 'Juventus'),
      p('it-82-3', 'Antonio Cabrini', 'Italy', 1982, 'LB', 92, false, ['LWB'], 3, 'Juventus'),
      p('it-82-4', 'Gaetano Scirea', 'Italy', 1982, 'CB', 96, false, ['CDM'], 7, 'Juventus'),
      p('it-82-5', 'Fulvio Collovati', 'Italy', 1982, 'CB', 88, false, [], 5, 'AC Milan'),
      p('it-82-6', 'Gabriele Oriali', 'Italy', 1982, 'CDM', 87, false, ['CM'], 13, 'Inter Milan'),
      p('it-82-7', 'Marco Tardelli', 'Italy', 1982, 'CM', 93, false, ['CDM'], 14, 'Juventus'),
      p('it-82-8', 'Giancarlo Antognoni', 'Italy', 1982, 'CAM', 90, false, ['CM'], 10, 'Fiorentina'),
      p('it-82-9', 'Bruno Conti', 'Italy', 1982, 'RW', 93, false, ['RM'], 16, 'AS Roma'),
      p('it-82-10', 'Paolo Rossi', 'Italy', 1982, 'ST', 95, false, ['CF'], 20, 'Juventus'),
      p('it-82-11', 'Francesco Graziani', 'Italy', 1982, 'LW', 86, false, ['ST'], 19, 'Fiorentina'),
      p('it-82-12', 'Alessandro Altobelli', 'Italy', 1982, 'ST', 88, false, [], 18, 'Inter Milan'),
      p('it-82-13', 'Giuseppe Bergomi', 'Italy', 1982, 'RB', 87, false, ['CB'], 2, 'Inter Milan'),
    ]
  },
  {
    year: 1982,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'Spain',
    players: [
      p('br-82-1', 'Waldir Peres', 'Brazil', 1982, 'GK', 81, true, [], 1, 'São Paulo'),
      p('br-82-2', 'Leandro', 'Brazil', 1982, 'RB', 91, false, ['RWB'], 2, 'Flamengo'),
      p('br-82-3', 'Júnior', 'Brazil', 1982, 'LB', 94, false, ['CM', 'LM'], 6, 'Flamengo'),
      p('br-82-4', 'Oscar', 'Brazil', 1982, 'CB', 88, false, [], 3, 'São Paulo'),
      p('br-82-5', 'Luizinho', 'Brazil', 1982, 'CB', 85, false, [], 4, 'Atlético Mineiro'),
      p('br-82-6', 'Toninho Cerezo', 'Brazil', 1982, 'CDM', 90, false, ['CM'], 5, 'Atlético Mineiro'),
      p('br-82-7', 'Falcão', 'Brazil', 1982, 'CM', 96, false, ['CAM', 'CDM'], 15, 'AS Roma'),
      p('br-82-8', 'Sócrates', 'Brazil', 1982, 'CM', 95, false, ['CAM', 'ST'], 8, 'Corinthians'),
      p('br-82-9', 'Zico', 'Brazil', 1982, 'CAM', 96, false, ['CF', 'ST'], 10, 'Flamengo'),
      p('br-82-10', 'Éder', 'Brazil', 1982, 'LW', 89, false, ['LM', 'ST'], 11, 'Atlético Mineiro'),
      p('br-82-11', 'Serginho Chulapa', 'Brazil', 1982, 'ST', 83, false, [], 9, 'São Paulo'),
    ]
  },
  {
    year: 1982,
    country: 'France',
    countryCode: '🇫🇷',
    flagEmoji: '🇫🇷',
    hostCountry: 'Spain',
    players: [
      p('fr-82-1', 'Jean-Luc Ettori', 'France', 1982, 'GK', 82, true, [], 22, 'Monaco'),
      p('fr-82-2', 'Manuel Amoros', 'France', 1982, 'RB', 90, false, ['LB'], 2, 'Monaco'),
      p('fr-82-3', 'Max Bossis', 'France', 1982, 'CB', 90, false, ['LB'], 4, 'Nantes'),
      p('fr-82-4', 'Marius Trésor', 'France', 1982, 'CB', 91, false, [], 8, 'Bordeaux'),
      p('fr-82-5', 'Gérard Janvion', 'France', 1982, 'LB', 84, false, ['CB'], 5, 'Saint-Étienne'),
      p('fr-82-6', 'Jean Tigana', 'France', 1982, 'CDM', 92, false, ['CM'], 12, 'Bordeaux'),
      p('fr-82-7', 'Alain Giresse', 'France', 1982, 'CM', 93, false, ['CAM'], 10, 'Bordeaux'),
      p('fr-82-8', 'Michel Platini', 'France', 1982, 'CAM', 96, false, ['CF', 'CM'], 10, 'Saint-Étienne'),
      p('fr-82-9', 'Bernard Genghini', 'France', 1982, 'CM', 87, false, ['CAM'], 9, 'Sochaux'),
      p('fr-82-10', 'Dominique Rocheteau', 'France', 1982, 'RW', 87, false, ['ST'], 18, 'Paris Saint-Germain'),
      p('fr-82-11', 'Didier Six', 'France', 1982, 'LW', 85, false, ['ST'], 19, 'Strasbourg'),
    ]
  },

  // 1986 World Cup (Mexico)
  {
    year: 1986,
    country: 'Argentina',
    countryCode: '🇦🇷',
    flagEmoji: '🇦🇷',
    hostCountry: 'Mexico',
    players: [
      p('arg-86-1', 'Nery Pumpido', 'Argentina', 1986, 'GK', 87, true, [], 18, 'River Plate'),
      p('arg-86-2', 'José Luis Cuciuffo', 'Argentina', 1986, 'RB', 86, false, ['CB'], 9, 'Vélez Sarsfield'),
      p('arg-86-3', 'Julio Olarticoechea', 'Argentina', 1986, 'LB', 86, false, ['LM'], 16, 'Boca Juniors'),
      p('arg-86-4', 'José Luis Brown', 'Argentina', 1986, 'CB', 88, false, [], 5, 'Deportivo Español'),
      p('arg-86-5', 'Oscar Ruggeri', 'Argentina', 1986, 'CB', 91, false, [], 19, 'River Plate'),
      p('arg-86-6', 'Sergio Batista', 'Argentina', 1986, 'CDM', 88, false, ['CM'], 2, 'Argentinos Juniors'),
      p('arg-86-7', 'Ricardo Giusti', 'Argentina', 1986, 'RM', 86, false, ['CM'], 14, 'Independiente'),
      p('arg-86-8', 'Héctor Enrique', 'Argentina', 1986, 'CM', 87, false, [], 12, 'River Plate'),
      p('arg-86-9', 'Jorge Burruchaga', 'Argentina', 1986, 'CAM', 92, false, ['RM', 'ST'], 7, 'Nantes'),
      p('arg-86-10', 'Diego Maradona', 'Argentina', 1986, 'CAM', 99, false, ['CF', 'ST'], 10, 'Napoli'),
      p('arg-86-11', 'Jorge Valdano', 'Argentina', 1986, 'ST', 92, false, ['LW', 'CF'], 11, 'Real Madrid'),
    ]
  },
  {
    year: 1986,
    country: 'West Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'Mexico',
    players: [
      p('wg-86-1', 'Harald Schumacher', 'West Germany', 1986, 'GK', 92, true, [], 1, '1. FC Köln'),
      p('wg-86-2', 'Thomas Berthold', 'West Germany', 1986, 'RB', 86, false, ['CB'], 14, 'Eintracht Frankfurt'),
      p('wg-86-3', 'Hans-Peter Briegel', 'West Germany', 1986, 'LB', 89, false, ['CM', 'CB'], 3, 'Hellas Verona'),
      p('wg-86-4', 'Karlheinz Förster', 'West Germany', 1986, 'CB', 90, false, [], 4, 'VfB Stuttgart'),
      p('wg-86-5', 'Norbert Eder', 'West Germany', 1986, 'CB', 83, false, [], 17, 'Bayern Munich'),
      p('wg-86-6', 'Lothar Matthäus', 'West Germany', 1986, 'CM', 92, false, ['CDM', 'CAM'], 8, 'Bayern Munich'),
      p('wg-86-7', 'Felix Magath', 'West Germany', 1986, 'CAM', 87, false, ['CM'], 10, 'Hamburger SV'),
      p('wg-86-8', 'Pierre Littbarski', 'West Germany', 1986, 'RW', 88, false, ['CAM', 'RM'], 7, '1. FC Köln'),
      p('wg-86-9', 'Karl-Heinz Rummenigge', 'West Germany', 1986, 'ST', 92, false, ['CF'], 11, 'Inter Milan'),
      p('wg-86-10', 'Rudi Völler', 'West Germany', 1986, 'ST', 90, false, ['CF'], 9, 'Werder Bremen'),
      p('wg-86-11', 'Klaus Allofs', 'West Germany', 1986, 'ST', 87, false, ['LW'], 19, '1. FC Köln'),
    ]
  },

  // 1990 World Cup (Italy)
  {
    year: 1990,
    country: 'West Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'Italy',
    players: [
      p('wg-90-1', 'Bodo Illgner', 'West Germany', 1990, 'GK', 90, true, [], 1, '1. FC Köln'),
      p('wg-90-2', 'Stefan Reuter', 'West Germany', 1990, 'RB', 88, false, ['RWB', 'RM'], 2, 'Bayern Munich'),
      p('wg-90-3', 'Andreas Brehme', 'West Germany', 1990, 'LB', 94, false, ['LWB', 'LM', 'CM'], 3, 'Inter Milan'),
      p('wg-90-4', 'Jürgen Kohler', 'West Germany', 1990, 'CB', 93, false, [], 4, 'Bayern Munich'),
      p('wg-90-5', 'Klaus Augenthaler', 'West Germany', 1990, 'CB', 89, false, ['CDM'], 5, 'Bayern Munich'),
      p('wg-90-6', 'Guido Buchwald', 'West Germany', 1990, 'CDM', 91, false, ['CB'], 6, 'VfB Stuttgart'),
      p('wg-90-7', 'Thomas Häßler', 'West Germany', 1990, 'CAM', 90, false, ['RM', 'RW'], 8, '1. FC Köln'),
      p('wg-90-8', 'Lothar Matthäus', 'West Germany', 1990, 'CM', 97, false, ['CAM', 'CDM'], 10, 'Inter Milan'),
      p('wg-90-9', 'Olaf Thon', 'West Germany', 1990, 'CM', 87, false, ['CAM'], 20, 'Bayern Munich'),
      p('wg-90-10', 'Jürgen Klinsmann', 'West Germany', 1990, 'ST', 93, false, ['CF'], 18, 'Inter Milan'),
      p('wg-90-11', 'Rudi Völler', 'West Germany', 1990, 'ST', 92, false, ['CF'], 9, 'AS Roma'),
    ]
  },
  {
    year: 1990,
    country: 'Italy',
    countryCode: '🇮🇹',
    flagEmoji: '🇮🇹',
    hostCountry: 'Italy',
    players: [
      p('it-90-1', 'Walter Zenga', 'Italy', 1990, 'GK', 92, true, [], 1, 'Inter Milan'),
      p('it-90-2', 'Giuseppe Bergomi', 'Italy', 1990, 'RB', 90, false, ['CB'], 2, 'Inter Milan'),
      p('it-90-3', 'Paolo Maldini', 'Italy', 1990, 'LB', 94, false, ['CB', 'LWB'], 7, 'AC Milan'),
      p('it-90-4', 'Franco Baresi', 'Italy', 1990, 'CB', 96, false, ['CDM'], 6, 'AC Milan'),
      p('it-90-5', 'Riccardo Ferri', 'Italy', 1990, 'CB', 88, false, [], 8, 'Inter Milan'),
      p('it-90-6', 'Roberto Donadoni', 'Italy', 1990, 'RM', 91, false, ['RW', 'CM'], 17, 'AC Milan'),
      p('it-90-7', 'Giuseppe Giannini', 'Italy', 1990, 'CM', 89, false, ['CAM'], 10, 'AS Roma'),
      p('it-90-8', 'Fernando De Napoli', 'Italy', 1990, 'CDM', 87, false, ['CM'], 11, 'Napoli'),
      p('it-90-9', 'Salvatore Schillaci', 'Italy', 1990, 'ST', 92, false, ['CF'], 19, 'Juventus'),
      p('it-90-10', 'Roberto Baggio', 'Italy', 1990, 'CF', 94, false, ['CAM', 'ST'], 15, 'Fiorentina'),
      p('it-90-11', 'Gianluca Vialli', 'Italy', 1990, 'ST', 90, false, ['CF'], 21, 'Sampdoria'),
    ]
  },
  {
    year: 1990,
    country: 'Cameroon',
    countryCode: '🇨🇲',
    flagEmoji: '🇨🇲',
    hostCountry: 'Italy',
    players: [
      p('cmr-90-1', 'Thomas N\'Kono', 'Cameroon', 1990, 'GK', 89, true, [], 16, 'RCD Espanyol'),
      p('cmr-90-2', 'Stephen Tataw', 'Cameroon', 1990, 'RB', 84, false, [], 14, 'TKC Yaoundé'),
      p('cmr-90-3', 'Bertin Ebwellé', 'Cameroon', 1990, 'LB', 83, false, [], 3, 'Tonnerre Yaoundé'),
      p('cmr-90-4', 'J Emmanuel Kundé', 'Cameroon', 1990, 'CB', 86, false, ['CDM'], 6, 'Prévoyance Yaoundé'),
      p('cmr-90-5', 'Benjamin Massing', 'Cameroon', 1990, 'CB', 84, false, [], 4, 'Créteil'),
      p('cmr-90-6', 'Cyrille Makanaky', 'Cameroon', 1990, 'RM', 86, false, ['CAM'], 20, 'Toulon'),
      p('cmr-90-7', 'Louis-Paul M\'Fédé', 'Cameroon', 1990, 'CM', 85, false, ['LM'], 10, 'Canon Yaoundé'),
      p('cmr-90-8', 'Emile M\'Bouh', 'Cameroon', 1990, 'CDM', 84, false, [], 8, 'Châteauroux'),
      p('cmr-90-9', 'François Omam-Biyik', 'Cameroon', 1990, 'ST', 88, false, ['CF'], 7, 'Laval'),
      p('cmr-90-10', 'Roger Milla', 'Cameroon', 1990, 'ST', 92, false, ['CF'], 9, 'JS Saint-Pierroise'),
      p('cmr-90-11', 'Eugène Ekéké', 'Cameroon', 1990, 'ST', 83, false, [], 18, 'Valenciennes'),
    ]
  },

  // 1994 World Cup (USA)
  {
    year: 1994,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'USA',
    players: [
      p('br-94-1', 'Taffarel', 'Brazil', 1994, 'GK', 91, true, [], 1, 'Reggiana'),
      p('br-94-2', 'Jorginho', 'Brazil', 1994, 'RB', 90, false, ['RWB'], 2, 'Bayern Munich'),
      p('br-94-3', 'Branco', 'Brazil', 1994, 'LB', 88, false, ['LWB'], 6, 'Fluminense'),
      p('br-94-4', 'Aldair', 'Brazil', 1994, 'CB', 92, false, [], 13, 'AS Roma'),
      p('br-94-5', 'Márcio Santos', 'Brazil', 1994, 'CB', 89, false, [], 15, 'Bordeaux'),
      p('br-94-6', 'Mauro Silva', 'Brazil', 1994, 'CDM', 91, false, ['CM'], 5, 'Deportivo La Coruña'),
      p('br-94-7', 'Dunga', 'Brazil', 1994, 'CDM', 92, false, ['CM'], 8, 'VfB Stuttgart'),
      p('br-94-8', 'Mazinho', 'Brazil', 1994, 'CM', 87, false, ['RM', 'RB'], 17, 'Palmeiras'),
      p('br-94-9', 'Zinho', 'Brazil', 1994, 'CAM', 88, false, ['LM', 'CM'], 9, 'Palmeiras'),
      p('br-94-10', 'Romário', 'Brazil', 1994, 'ST', 97, false, ['CF'], 11, 'Barcelona'),
      p('br-94-11', 'Bebeto', 'Brazil', 1994, 'ST', 93, false, ['CF', 'RW'], 7, 'Deportivo La Coruña'),
      p('br-94-12', 'Cafu', 'Brazil', 1994, 'RB', 89, false, ['RM', 'RWB'], 14, 'São Paulo'),
      p('br-94-13', 'Ronaldo', 'Brazil', 1994, 'ST', 90, false, ['CF'], 20, 'Cruzeiro'),
    ]
  },
  {
    year: 1994,
    country: 'Italy',
    countryCode: '🇮🇹',
    flagEmoji: '🇮🇹',
    hostCountry: 'USA',
    players: [
      p('it-94-1', 'Gianluca Pagliuca', 'Italy', 1994, 'GK', 90, true, [], 1, 'Sampdoria'),
      p('it-94-2', 'Roberto Mussi', 'Italy', 1994, 'RB', 85, false, ['CB'], 8, 'Torino'),
      p('it-94-3', 'Paolo Maldini', 'Italy', 1994, 'LB', 96, false, ['CB'], 5, 'AC Milan'),
      p('it-94-4', 'Franco Baresi', 'Italy', 1994, 'CB', 95, false, [], 6, 'AC Milan'),
      p('it-94-5', 'Antonio Benarrivo', 'Italy', 1994, 'RB', 88, false, ['LB'], 16, 'Parma'),
      p('it-94-6', 'Demetrio Albertini', 'Italy', 1994, 'CDM', 91, false, ['CM'], 11, 'AC Milan'),
      p('it-94-7', 'Dino Baggio', 'Italy', 1994, 'CM', 89, false, ['CDM'], 13, 'Juventus'),
      p('it-94-8', 'Roberto Donadoni', 'Italy', 1994, 'RM', 90, false, ['RW'], 16, 'AC Milan'),
      p('it-94-9', 'Nicola Berti', 'Italy', 1994, 'LM', 86, false, ['CM'], 14, 'Inter Milan'),
      p('it-94-10', 'Roberto Baggio', 'Italy', 1994, 'CF', 97, false, ['ST', 'CAM'], 10, 'Juventus'),
      p('it-94-11', 'Giuseppe Signori', 'Italy', 1994, 'LW', 89, false, ['ST'], 20, 'Lazio'),
      p('it-94-12', 'Gianfranco Zola', 'Italy', 1994, 'CAM', 90, false, ['CF'], 21, 'Parma'),
    ]
  },
  {
    year: 1994,
    country: 'Sweden',
    countryCode: '🇸🇪',
    flagEmoji: '🇸🇪',
    hostCountry: 'USA',
    players: [
      p('swe-94-1', 'Thomas Ravelli', 'Sweden', 1994, 'GK', 89, true, [], 1, 'IFK Göteborg'),
      p('swe-94-2', 'Roland Nilsson', 'Sweden', 1994, 'RB', 86, false, [], 2, 'Sheffield Wednesday'),
      p('swe-94-3', 'Roger Ljung', 'Sweden', 1994, 'LB', 85, false, [], 5, 'Galatasaray'),
      p('swe-94-4', 'Patrik Andersson', 'Sweden', 1994, 'CB', 89, false, [], 3, 'Mönchengladbach'),
      p('swe-94-5', 'Joachim Björklund', 'Sweden', 1994, 'CB', 85, false, [], 4, 'IFK Göteborg'),
      p('swe-94-6', 'Stefan Schwarz', 'Sweden', 1994, 'CDM', 88, false, ['CM'], 6, 'Benfica'),
      p('swe-94-7', 'Jonas Thern', 'Sweden', 1994, 'CM', 88, false, ['CAM'], 8, 'Napoli'),
      p('swe-94-8', 'Klas Ingesson', 'Sweden', 1994, 'RM', 85, false, ['CM'], 9, 'PSV Eindhoven'),
      p('swe-94-9', 'Tomas Brolin', 'Sweden', 1994, 'CAM', 92, false, ['ST', 'RW'], 11, 'Parma'),
      p('swe-94-10', 'Kennet Andersson', 'Sweden', 1994, 'ST', 89, false, ['CF'], 19, 'Lille'),
      p('swe-94-11', 'Martin Dahlin', 'Sweden', 1994, 'ST', 90, false, ['CF'], 10, 'Mönchengladbach'),
      p('swe-94-12', 'Henrik Larsson', 'Sweden', 1994, 'ST', 87, false, ['RW'], 7, 'Feyenoord'),
    ]
  },

  // 1998 World Cup (France)
  {
    year: 1998,
    country: 'France',
    countryCode: '🇫🇷',
    flagEmoji: '🇫🇷',
    hostCountry: 'France',
    players: [
      p('fr-98-1', 'Fabien Barthez', 'France', 1998, 'GK', 92, true, [], 16, 'Monaco'),
      p('fr-98-2', 'Lilian Thuram', 'France', 1998, 'RB', 94, false, ['CB', 'RWB'], 15, 'Parma'),
      p('fr-98-3', 'Bixente Lizarazu', 'France', 1998, 'LB', 92, false, ['LWB'], 3, 'Bayern Munich'),
      p('fr-98-4', 'Marcel Desailly', 'France', 1998, 'CB', 95, false, ['CDM'], 8, 'AC Milan'),
      p('fr-98-5', 'Laurent Blanc', 'France', 1998, 'CB', 93, false, [], 5, 'Marseille'),
      p('fr-98-6', 'Didier Deschamps', 'France', 1998, 'CDM', 92, false, ['CM'], 7, 'Juventus'),
      p('fr-98-7', 'Emmanuel Petit', 'France', 1998, 'CM', 90, false, ['CDM', 'LB'], 17, 'Arsenal'),
      p('fr-98-8', 'Christian Karembeu', 'France', 1998, 'RM', 87, false, ['CM', 'RB'], 19, 'Real Madrid'),
      p('fr-98-9', 'Zinedine Zidane', 'France', 1998, 'CAM', 97, false, ['CM'], 10, 'Juventus'),
      p('fr-98-10', 'Youri Djorkaeff', 'France', 1998, 'CAM', 91, false, ['CF', 'LW'], 6, 'Inter Milan'),
      p('fr-98-11', 'Stéphane Guivarc\'h', 'France', 1998, 'ST', 84, false, [], 9, 'Auxerre'),
      p('fr-98-12', 'Thierry Henry', 'France', 1998, 'LW', 89, false, ['ST', 'RW'], 12, 'Monaco'),
      p('fr-98-13', 'David Trezeguet', 'France', 1998, 'ST', 88, false, [], 20, 'Monaco'),
      p('fr-98-14', 'Patrick Vieira', 'France', 1998, 'CM', 89, false, ['CDM'], 4, 'Arsenal'),
      p('fr-98-15', 'Robert Pires', 'France', 1998, 'LM', 87, false, ['CAM', 'LW'], 11, 'Metz'),
    ]
  },
  {
    year: 1998,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'France',
    players: [
      p('br-98-1', 'Taffarel', 'Brazil', 1998, 'GK', 90, true, [], 1, 'Atlético Mineiro'),
      p('br-98-2', 'Cafu', 'Brazil', 1998, 'RB', 93, false, ['RWB', 'RM'], 2, 'AS Roma'),
      p('br-98-3', 'Roberto Carlos', 'Brazil', 1998, 'LB', 95, false, ['LWB', 'LM'], 6, 'Real Madrid'),
      p('br-98-4', 'Aldair', 'Brazil', 1998, 'CB', 90, false, [], 3, 'AS Roma'),
      p('br-98-5', 'Júnior Baiano', 'Brazil', 1998, 'CB', 86, false, [], 4, 'Flamengo'),
      p('br-98-6', 'Dunga', 'Brazil', 1998, 'CDM', 91, false, ['CM'], 8, 'Júbilo Iwata'),
      p('br-98-7', 'César Sampaio', 'Brazil', 1998, 'CM', 88, false, ['CDM'], 5, 'Yokohama Flügels'),
      p('br-98-8', 'Leonardo', 'Brazil', 1998, 'CAM', 90, false, ['CM', 'LB'], 18, 'AC Milan'),
      p('br-98-9', 'Rivaldo', 'Brazil', 1998, 'CAM', 95, false, ['LW', 'ST'], 10, 'Barcelona'),
      p('br-98-10', 'Ronaldo', 'Brazil', 1998, 'ST', 97, false, ['CF'], 9, 'Inter Milan'),
      p('br-98-11', 'Bebeto', 'Brazil', 1998, 'ST', 88, false, ['CF'], 20, 'Botafogo'),
      p('br-98-12', 'Denílson', 'Brazil', 1998, 'LW', 89, false, ['LM'], 17, 'São Paulo'),
    ]
  },
  {
    year: 1998,
    country: 'Croatia',
    countryCode: '🇭🇷',
    flagEmoji: '🇭🇷',
    hostCountry: 'France',
    players: [
      p('cro-98-1', 'Dražen Ladić', 'Croatia', 1998, 'GK', 88, true, [], 1, 'Croatia Zagreb'),
      p('cro-98-2', 'Dario Šimić', 'Croatia', 1998, 'RB', 86, false, ['CB'], 20, 'Croatia Zagreb'),
      p('cro-98-3', 'Robert Jarni', 'Croatia', 1998, 'LB', 90, false, ['LWB', 'LM'], 17, 'Real Betis'),
      p('cro-98-4', 'Slaven Bilić', 'Croatia', 1998, 'CB', 88, false, [], 6, 'Everton'),
      p('cro-98-5', 'Igor Štimac', 'Croatia', 1998, 'CB', 86, false, [], 4, 'Derby County'),
      p('cro-98-6', 'Krunoslav Jurčić', 'Croatia', 1998, 'CDM', 84, false, [], 14, 'Croatia Zagreb'),
      p('cro-98-7', 'Aljoša Asanović', 'Croatia', 1998, 'CM', 89, false, ['CAM'], 7, 'Napoli'),
      p('cro-98-8', 'Zvonimir Boban', 'Croatia', 1998, 'CAM', 93, false, ['CM'], 10, 'AC Milan'),
      p('cro-98-9', 'Robert Prosinečki', 'Croatia', 1998, 'CAM', 92, false, ['CM', 'RW'], 8, 'Croatia Zagreb'),
      p('cro-98-10', 'Mario Stanić', 'Croatia', 1998, 'RM', 87, false, ['RW', 'RB'], 13, 'Parma'),
      p('cro-98-11', 'Davor Šuker', 'Croatia', 1998, 'ST', 95, false, ['CF'], 9, 'Real Madrid'),
    ]
  },
  {
    year: 1998,
    country: 'England',
    countryCode: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hostCountry: 'France',
    players: [
      p('eng-98-1', 'David Seaman', 'England', 1998, 'GK', 90, true, [], 1, 'Arsenal'),
      p('eng-98-2', 'Gary Neville', 'England', 1998, 'RB', 88, false, ['RWB'], 2, 'Manchester United'),
      p('eng-98-3', 'Graeme Le Saux', 'England', 1998, 'LB', 87, false, ['LWB'], 3, 'Chelsea'),
      p('eng-98-4', 'Sol Campbell', 'England', 1998, 'CB', 90, false, [], 5, 'Tottenham Hotspur'),
      p('eng-98-5', 'Tony Adams', 'England', 1998, 'CB', 91, false, [], 6, 'Arsenal'),
      p('eng-98-6', 'Paul Ince', 'England', 1998, 'CDM', 88, false, ['CM'], 4, 'Liverpool'),
      p('eng-98-7', 'David Beckham', 'England', 1998, 'RM', 93, false, ['CM', 'RW'], 7, 'Manchester United'),
      p('eng-98-8', 'Paul Scholes', 'England', 1998, 'CM', 91, false, ['CAM'], 16, 'Manchester United'),
      p('eng-98-9', 'Darren Anderton', 'England', 1998, 'LM', 86, false, ['RM'], 14, 'Tottenham Hotspur'),
      p('eng-98-10', 'Alan Shearer', 'England', 1998, 'ST', 94, false, ['CF'], 9, 'Newcastle United'),
      p('eng-98-11', 'Michael Owen', 'England', 1998, 'ST', 92, false, ['CF'], 20, 'Liverpool'),
      p('eng-98-12', 'Teddy Sheringham', 'England', 1998, 'ST', 87, false, ['CF'], 10, 'Manchester United'),
    ]
  },

  // 2002 World Cup (South Korea & Japan)
  {
    year: 2002,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'South Korea / Japan',
    players: [
      p('br-02-1', 'Marcos', 'Brazil', 2002, 'GK', 89, true, [], 1, 'Palmeiras'),
      p('br-02-2', 'Cafu', 'Brazil', 2002, 'RWB', 94, false, ['RB', 'RM'], 2, 'AS Roma'),
      p('br-02-3', 'Roberto Carlos', 'Brazil', 2002, 'LWB', 95, false, ['LB', 'LM'], 6, 'Real Madrid'),
      p('br-02-4', 'Lúcio', 'Brazil', 2002, 'CB', 92, false, [], 3, 'Bayer Leverkusen'),
      p('br-02-5', 'Roque Júnior', 'Brazil', 2002, 'CB', 87, false, [], 4, 'AC Milan'),
      p('br-02-6', 'Edmílson', 'Brazil', 2002, 'CB', 88, false, ['CDM'], 5, 'Lyon'),
      p('br-02-7', 'Gilberto Silva', 'Brazil', 2002, 'CDM', 90, false, ['CM'], 8, 'Atlético Mineiro'),
      p('br-02-8', 'Kléberson', 'Brazil', 2002, 'CM', 88, false, ['RM'], 15, 'Atlético Paranaense'),
      p('br-02-9', 'Ronaldinho', 'Brazil', 2002, 'CAM', 96, false, ['LW', 'CF'], 11, 'Paris Saint-Germain'),
      p('br-02-10', 'Rivaldo', 'Brazil', 2002, 'CAM', 96, false, ['CF', 'ST'], 10, 'Barcelona'),
      p('br-02-11', 'Ronaldo', 'Brazil', 2002, 'ST', 98, false, ['CF'], 9, 'Inter Milan'),
      p('br-02-12', 'Kaká', 'Brazil', 2002, 'CAM', 88, false, ['CM'], 23, 'São Paulo'),
      p('br-02-13', 'Denílson', 'Brazil', 2002, 'LW', 87, false, ['LM'], 17, 'Real Betis'),
    ]
  },
  {
    year: 2002,
    country: 'Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'South Korea / Japan',
    players: [
      p('ger-02-1', 'Oliver Kahn', 'Germany', 2002, 'GK', 96, true, [], 1, 'Bayern Munich'),
      p('ger-02-2', 'Bernd Schneider', 'Germany', 2002, 'RM', 89, false, ['RWB', 'CM'], 19, 'Bayer Leverkusen'),
      p('ger-02-3', 'Marco Bode', 'Germany', 2002, 'LM', 85, false, ['LWB'], 17, 'Werder Bremen'),
      p('ger-02-4', 'Thomas Linke', 'Germany', 2002, 'CB', 87, false, [], 2, 'Bayern Munich'),
      p('ger-02-5', 'Carsten Ramelow', 'Germany', 2002, 'CB', 86, false, ['CDM'], 5, 'Bayer Leverkusen'),
      p('ger-02-6', 'Christoph Metzelder', 'Germany', 2002, 'CB', 88, false, ['LB'], 21, 'Borussia Dortmund'),
      p('ger-02-7', 'Dietmar Hamann', 'Germany', 2002, 'CDM', 88, false, ['CM'], 8, 'Liverpool'),
      p('ger-02-8', 'Torsten Frings', 'Germany', 2002, 'CM', 88, false, ['RB', 'RM'], 22, 'Werder Bremen'),
      p('ger-02-9', 'Michael Ballack', 'Germany', 2002, 'CAM', 94, false, ['CM', 'CDM'], 13, 'Bayer Leverkusen'),
      p('ger-02-10', 'Miroslav Klose', 'Germany', 2002, 'ST', 91, false, ['CF'], 11, '1. FC Kaiserslautern'),
      p('ger-02-11', 'Oliver Neuville', 'Germany', 2002, 'ST', 86, false, ['RW'], 7, 'Bayer Leverkusen'),
    ]
  },
  {
    year: 2002,
    country: 'Turkey',
    countryCode: '🇹🇷',
    flagEmoji: '🇹🇷',
    hostCountry: 'South Korea / Japan',
    players: [
      p('tur-02-1', 'Rüştü Reçber', 'Turkey', 2002, 'GK', 91, true, [], 1, 'Fenerbahçe'),
      p('tur-02-2', 'Fatih Akyel', 'Turkey', 2002, 'RB', 85, false, [], 4, 'Fenerbahçe'),
      p('tur-02-3', 'Hakan Ünsal', 'Turkey', 2002, 'LB', 85, false, [], 3, 'Blackburn Rovers'),
      p('tur-02-4', 'Alpay Özalan', 'Turkey', 2002, 'CB', 89, false, [], 5, 'Aston Villa'),
      p('tur-02-5', 'Bülent Korkmaz', 'Turkey', 2002, 'CB', 87, false, [], 2, 'Galatasaray'),
      p('tur-02-6', 'Tugay Kerimoğlu', 'Turkey', 2002, 'CDM', 90, false, ['CM'], 8, 'Blackburn Rovers'),
      p('tur-02-7', 'Emre Belözoğlu', 'Turkey', 2002, 'CM', 88, false, ['CAM'], 21, 'Inter Milan'),
      p('tur-02-8', 'Yıldıray Baştürk', 'Turkey', 2002, 'CAM', 90, false, ['CM'], 10, 'Bayer Leverkusen'),
      p('tur-02-9', 'Hasan Şaş', 'Turkey', 2002, 'LW', 90, false, ['LM', 'ST'], 11, 'Galatasaray'),
      p('tur-02-10', 'Hakan Şükür', 'Turkey', 2002, 'ST', 89, false, ['CF'], 9, 'Parma'),
      p('tur-02-11', 'İlhan Mansız', 'Turkey', 2002, 'ST', 88, false, ['CF'], 17, 'Beşiktaş'),
    ]
  },

  // 2006 World Cup (Germany)
  {
    year: 2006,
    country: 'Italy',
    countryCode: '🇮🇹',
    flagEmoji: '🇮🇹',
    hostCountry: 'Germany',
    players: [
      p('it-06-1', 'Gianluigi Buffon', 'Italy', 2006, 'GK', 96, true, [], 1, 'Juventus'),
      p('it-06-2', 'Gianluca Zambrotta', 'Italy', 2006, 'RB', 93, false, ['LB', 'RM', 'LM'], 19, 'Juventus'),
      p('it-06-3', 'Fabio Grosso', 'Italy', 2006, 'LB', 91, false, ['LWB'], 3, 'Palermo'),
      p('it-06-4', 'Fabio Cannavaro', 'Italy', 2006, 'CB', 97, false, [], 5, 'Juventus'),
      p('it-06-5', 'Marco Materazzi', 'Italy', 2006, 'CB', 90, false, [], 23, 'Inter Milan'),
      p('it-06-6', 'Alessandro Nesta', 'Italy', 2006, 'CB', 94, false, [], 13, 'AC Milan'),
      p('it-06-7', 'Gennaro Gattuso', 'Italy', 2006, 'CDM', 92, false, ['CM'], 8, 'AC Milan'),
      p('it-06-8', 'Andrea Pirlo', 'Italy', 2006, 'CM', 96, false, ['CDM', 'CAM'], 21, 'AC Milan'),
      p('it-06-9', 'Simone Perrotta', 'Italy', 2006, 'CM', 88, false, ['CAM'], 20, 'AS Roma'),
      p('it-06-10', 'Mauro Camoranesi', 'Italy', 2006, 'RM', 89, false, ['RW'], 16, 'Juventus'),
      p('it-06-11', 'Francesco Totti', 'Italy', 2006, 'CAM', 95, false, ['CF', 'ST'], 10, 'AS Roma'),
      p('it-06-12', 'Alessandro Del Piero', 'Italy', 2006, 'CF', 93, false, ['ST', 'LW'], 7, 'Juventus'),
      p('it-06-13', 'Luca Toni', 'Italy', 2006, 'ST', 91, false, ['CF'], 9, 'Fiorentina'),
      p('it-06-14', 'Alberto Gilardino', 'Italy', 2006, 'ST', 88, false, [], 11, 'AC Milan'),
      p('it-06-15', 'Daniele De Rossi', 'Italy', 2006, 'CDM', 90, false, ['CM'], 4, 'AS Roma'),
    ]
  },
  {
    year: 2006,
    country: 'France',
    countryCode: '🇫🇷',
    flagEmoji: '🇫🇷',
    hostCountry: 'Germany',
    players: [
      p('fr-06-1', 'Fabien Barthez', 'France', 2006, 'GK', 89, true, [], 16, 'Marseille'),
      p('fr-06-2', 'Willy Sagnol', 'France', 2006, 'RB', 90, false, ['RWB'], 19, 'Bayern Munich'),
      p('fr-06-3', 'Éric Abidal', 'France', 2006, 'LB', 89, false, ['CB'], 3, 'Lyon'),
      p('fr-06-4', 'Lilian Thuram', 'France', 2006, 'CB', 94, false, ['RB'], 15, 'Juventus'),
      p('fr-06-5', 'William Gallas', 'France', 2006, 'CB', 91, false, ['LB'], 5, 'Chelsea'),
      p('fr-06-6', 'Claude Makélélé', 'France', 2006, 'CDM', 94, false, ['CM'], 6, 'Chelsea'),
      p('fr-06-7', 'Patrick Vieira', 'France', 2006, 'CM', 94, false, ['CDM'], 4, 'Juventus'),
      p('fr-06-8', 'Franck Ribéry', 'France', 2006, 'LM', 90, false, ['LW', 'RM'], 22, 'Marseille'),
      p('fr-06-9', 'Florent Malouda', 'France', 2006, 'LM', 88, false, ['LW'], 7, 'Lyon'),
      p('fr-06-10', 'Zinedine Zidane', 'France', 2006, 'CAM', 98, false, ['CM'], 10, 'Real Madrid'),
      p('fr-06-11', 'Thierry Henry', 'France', 2006, 'ST', 96, false, ['CF', 'LW'], 12, 'Arsenal'),
      p('fr-06-12', 'David Trezeguet', 'France', 2006, 'ST', 90, false, [], 20, 'Juventus'),
      p('fr-06-13', 'Sylvain Wiltord', 'France', 2006, 'RW', 87, false, ['ST'], 11, 'Lyon'),
    ]
  },
  {
    year: 2006,
    country: 'Portugal',
    countryCode: '🇵🇹',
    flagEmoji: '🇵🇹',
    hostCountry: 'Germany',
    players: [
      p('por-06-1', 'Ricardo', 'Portugal', 2006, 'GK', 88, true, [], 1, 'Sporting CP'),
      p('por-06-2', 'Miguel', 'Portugal', 2006, 'RB', 88, false, ['RWB'], 13, 'Valencia'),
      p('por-06-3', 'Nuno Valente', 'Portugal', 2006, 'LB', 85, false, [], 14, 'Everton'),
      p('por-06-4', 'Ricardo Carvalho', 'Portugal', 2006, 'CB', 93, false, [], 16, 'Chelsea'),
      p('por-06-5', 'Fernando Meira', 'Portugal', 2006, 'CB', 86, false, ['CDM'], 5, 'VfB Stuttgart'),
      p('por-06-6', 'Maniche', 'Portugal', 2006, 'CM', 90, false, ['CDM'], 18, 'Chelsea'),
      p('por-06-7', 'Costinha', 'Portugal', 2006, 'CDM', 87, false, [], 6, 'Dynamo Moscow'),
      p('por-06-8', 'Deco', 'Portugal', 2006, 'CAM', 94, false, ['CM'], 20, 'Barcelona'),
      p('por-06-9', 'Luís Figo', 'Portugal', 2006, 'RM', 94, false, ['RW', 'CAM'], 7, 'Inter Milan'),
      p('por-06-10', 'Cristiano Ronaldo', 'Portugal', 2006, 'LW', 93, false, ['RW', 'ST'], 17, 'Manchester United'),
      p('por-06-11', 'Pauleta', 'Portugal', 2006, 'ST', 88, false, ['CF'], 9, 'Paris Saint-Germain'),
      p('por-06-12', 'Simão Sabrosa', 'Portugal', 2006, 'LW', 87, false, ['RW'], 11, 'Benfica'),
    ]
  },

  // 2010 World Cup (South Africa)
  {
    year: 2010,
    country: 'Spain',
    countryCode: '🇪🇸',
    flagEmoji: '🇪🇸',
    hostCountry: 'South Africa',
    players: [
      p('esp-10-1', 'Iker Casillas', 'Spain', 2010, 'GK', 95, true, [], 1, 'Real Madrid'),
      p('esp-10-2', 'Sergio Ramos', 'Spain', 2010, 'RB', 93, false, ['CB', 'RWB'], 15, 'Real Madrid'),
      p('esp-10-3', 'Joan Capdevila', 'Spain', 2010, 'LB', 88, false, ['LWB'], 11, 'Villarreal'),
      p('esp-10-4', 'Carles Puyol', 'Spain', 2010, 'CB', 94, false, ['RB'], 5, 'Barcelona'),
      p('esp-10-5', 'Gerard Piqué', 'Spain', 2010, 'CB', 92, false, [], 3, 'Barcelona'),
      p('esp-10-6', 'Sergio Busquets', 'Spain', 2010, 'CDM', 91, false, ['CM'], 16, 'Barcelona'),
      p('esp-10-7', 'Xabi Alonso', 'Spain', 2010, 'CM', 93, false, ['CDM'], 14, 'Real Madrid'),
      p('esp-10-8', 'Xavi Hernández', 'Spain', 2010, 'CM', 97, false, ['CAM'], 8, 'Barcelona'),
      p('esp-10-9', 'Andrés Iniesta', 'Spain', 2010, 'CAM', 97, false, ['LW', 'CM'], 6, 'Barcelona'),
      p('esp-10-10', 'David Villa', 'Spain', 2010, 'ST', 95, false, ['LW', 'CF'], 7, 'Valencia'),
      p('esp-10-11', 'Fernando Torres', 'Spain', 2010, 'ST', 91, false, ['CF'], 9, 'Liverpool'),
      p('esp-10-12', 'Cesc Fàbregas', 'Spain', 2010, 'CAM', 92, false, ['CM', 'CF'], 10, 'Arsenal'),
      p('esp-10-13', 'Pedro Rodríguez', 'Spain', 2010, 'RW', 89, false, ['LW'], 18, 'Barcelona'),
      p('esp-10-14', 'Jesus Navas', 'Spain', 2010, 'RW', 87, false, ['RM'], 22, 'Sevilla'),
    ]
  },
  {
    year: 2010,
    country: 'Netherlands',
    countryCode: '🇳🇱',
    flagEmoji: '🇳🇱',
    hostCountry: 'South Africa',
    players: [
      p('ned-10-1', 'Maarten Stekelenburg', 'Netherlands', 2010, 'GK', 89, true, [], 1, 'Ajax'),
      p('ned-10-2', 'Gregory van der Wiel', 'Netherlands', 2010, 'RB', 87, false, ['RWB'], 2, 'Ajax'),
      p('ned-10-3', 'Giovanni van Bronckhorst', 'Netherlands', 2010, 'LB', 90, false, ['LM', 'CM'], 5, 'Feyenoord'),
      p('ned-10-4', 'John Heitinga', 'Netherlands', 2010, 'CB', 88, false, ['RB'], 3, 'Everton'),
      p('ned-10-5', 'Joris Mathijsen', 'Netherlands', 2010, 'CB', 87, false, [], 4, 'Hamburger SV'),
      p('ned-10-6', 'Nigel de Jong', 'Netherlands', 2010, 'CDM', 90, false, ['CM'], 8, 'Manchester City'),
      p('ned-10-7', 'Mark van Bommel', 'Netherlands', 2010, 'CDM', 91, false, ['CM'], 6, 'Bayern Munich'),
      p('ned-10-8', 'Wesley Sneijder', 'Netherlands', 2010, 'CAM', 96, false, ['CM'], 10, 'Inter Milan'),
      p('ned-10-9', 'Arjen Robben', 'Netherlands', 2010, 'RW', 95, false, ['RM', 'LW'], 11, 'Bayern Munich'),
      p('ned-10-10', 'Dirk Kuyt', 'Netherlands', 2010, 'LW', 89, false, ['RW', 'ST'], 7, 'Liverpool'),
      p('ned-10-11', 'Robin van Persie', 'Netherlands', 2010, 'ST', 93, false, ['CF'], 9, 'Arsenal'),
      p('ned-10-12', 'Rafael van der Vaart', 'Netherlands', 2010, 'CAM', 90, false, ['CM'], 23, 'Real Madrid'),
    ]
  },
  {
    year: 2010,
    country: 'Uruguay',
    countryCode: '🇺🇾',
    flagEmoji: '🇺🇾',
    hostCountry: 'South Africa',
    players: [
      p('uru-10-1', 'Fernando Muslera', 'Uruguay', 2010, 'GK', 88, true, [], 1, 'Lazio'),
      p('uru-10-2', 'Maxi Pereira', 'Uruguay', 2010, 'RB', 87, false, ['RM', 'RWB'], 16, 'Benfica'),
      p('uru-10-3', 'Jorge Fucile', 'Uruguay', 2010, 'LB', 86, false, ['RB'], 4, 'Porto'),
      p('uru-10-4', 'Diego Lugano', 'Uruguay', 2010, 'CB', 90, false, [], 2, 'Fenerbahçe'),
      p('uru-10-5', 'Diego Godín', 'Uruguay', 2010, 'CB', 91, false, [], 3, 'Villarreal'),
      p('uru-10-6', 'Egidio Arévalo Ríos', 'Uruguay', 2010, 'CDM', 88, false, ['CM'], 17, 'Peñarol'),
      p('uru-10-7', 'Diego Pérez', 'Uruguay', 2010, 'CM', 87, false, ['CDM'], 15, 'Monaco'),
      p('uru-10-8', 'Álvaro Pereira', 'Uruguay', 2010, 'LM', 86, false, ['LB', 'LWB'], 11, 'Porto'),
      p('uru-10-9', 'Diego Forlán', 'Uruguay', 2010, 'CF', 96, false, ['ST', 'CAM'], 10, 'Atlético Madrid'),
      p('uru-10-10', 'Luis Suárez', 'Uruguay', 2010, 'ST', 93, false, ['CF', 'RW'], 9, 'Ajax'),
      p('uru-10-11', 'Edinson Cavani', 'Uruguay', 2010, 'ST', 90, false, ['LW', 'RW'], 21, 'Palermo'),
    ]
  },

  // 2014 World Cup (Brazil)
  {
    year: 2014,
    country: 'Germany',
    countryCode: '🇩🇪',
    flagEmoji: '🇩🇪',
    hostCountry: 'Brazil',
    players: [
      p('ger-14-1', 'Manuel Neuer', 'Germany', 2014, 'GK', 96, true, [], 1, 'Bayern Munich'),
      p('ger-14-2', 'Philipp Lahm', 'Germany', 2014, 'RB', 95, false, ['LB', 'CDM', 'CM'], 16, 'Bayern Munich'),
      p('ger-14-3', 'Benedikt Höwedes', 'Germany', 2014, 'LB', 88, false, ['CB'], 4, 'Schalke 04'),
      p('ger-14-4', 'Mats Hummels', 'Germany', 2014, 'CB', 94, false, [], 5, 'Borussia Dortmund'),
      p('ger-14-5', 'Jérôme Boateng', 'Germany', 2014, 'CB', 92, false, ['RB'], 20, 'Bayern Munich'),
      p('ger-14-6', 'Bastian Schweinsteiger', 'Germany', 2014, 'CDM', 94, false, ['CM'], 7, 'Bayern Munich'),
      p('ger-14-7', 'Sami Khedira', 'Germany', 2014, 'CM', 90, false, ['CDM'], 6, 'Real Madrid'),
      p('ger-14-8', 'Toni Kroos', 'Germany', 2014, 'CM', 95, false, ['CAM', 'CDM'], 18, 'Bayern Munich'),
      p('ger-14-9', 'Mesut Özil', 'Germany', 2014, 'CAM', 93, false, ['RW', 'LW'], 8, 'Arsenal'),
      p('ger-14-10', 'Thomas Müller', 'Germany', 2014, 'RW', 94, false, ['ST', 'CAM', 'RM'], 13, 'Bayern Munich'),
      p('ger-14-11', 'Miroslav Klose', 'Germany', 2014, 'ST', 90, false, ['CF'], 11, 'Lazio'),
      p('ger-14-12', 'Mario Götze', 'Germany', 2014, 'CAM', 91, false, ['LW', 'CF'], 19, 'Bayern Munich'),
      p('ger-14-13', 'André Schürrle', 'Germany', 2014, 'LW', 89, false, ['ST', 'RW'], 9, 'Chelsea'),
    ]
  },
  {
    year: 2014,
    country: 'Argentina',
    countryCode: '🇦🇷',
    flagEmoji: '🇦🇷',
    hostCountry: 'Brazil',
    players: [
      p('arg-14-1', 'Sergio Romero', 'Argentina', 2014, 'GK', 90, true, [], 1, 'Monaco'),
      p('arg-14-2', 'Pablo Zabaleta', 'Argentina', 2014, 'RB', 90, false, ['RWB'], 4, 'Manchester City'),
      p('arg-14-3', 'Marcos Rojo', 'Argentina', 2014, 'LB', 88, false, ['CB'], 16, 'Sporting CP'),
      p('arg-14-4', 'Ezequiel Garay', 'Argentina', 2014, 'CB', 90, false, [], 2, 'Benfica'),
      p('arg-14-5', 'Martin Demichelis', 'Argentina', 2014, 'CB', 87, false, [], 15, 'Manchester City'),
      p('arg-14-6', 'Javier Mascherano', 'Argentina', 2014, 'CDM', 95, false, ['CB', 'CM'], 14, 'Barcelona'),
      p('arg-14-7', 'Lucas Biglia', 'Argentina', 2014, 'CM', 87, false, ['CDM'], 6, 'Lazio'),
      p('arg-14-8', 'Angel Di María', 'Argentina', 2014, 'RM', 94, false, ['RW', 'CM', 'LM'], 7, 'Real Madrid'),
      p('arg-14-9', 'Lionel Messi', 'Argentina', 2014, 'CAM', 98, false, ['CF', 'ST', 'RW'], 10, 'Barcelona'),
      p('arg-14-10', 'Gonzalo Higuaín', 'Argentina', 2014, 'ST', 91, false, ['CF'], 9, 'Napoli'),
      p('arg-14-11', 'Sergio Agüero', 'Argentina', 2014, 'ST', 93, false, ['CF'], 20, 'Manchester City'),
      p('arg-14-12', 'Ezequiel Lavezzi', 'Argentina', 2014, 'LW', 88, false, ['RW', 'ST'], 22, 'Paris Saint-Germain'),
    ]
  },
  {
    year: 2014,
    country: 'Colombia',
    countryCode: '🇨🇴',
    flagEmoji: '🇨🇴',
    hostCountry: 'Brazil',
    players: [
      p('col-14-1', 'David Ospina', 'Colombia', 2014, 'GK', 89, true, [], 1, 'Nice'),
      p('col-14-2', 'Camilo Zúñiga', 'Colombia', 2014, 'RB', 87, false, ['RWB', 'RM'], 18, 'Napoli'),
      p('col-14-3', 'Pablo Armero', 'Colombia', 2014, 'LB', 86, false, ['LWB', 'LM'], 7, 'West Ham United'),
      p('col-14-4', 'Mario Yepes', 'Colombia', 2014, 'CB', 89, false, [], 3, 'Atalanta'),
      p('col-14-5', 'Cristián Zapata', 'Colombia', 2014, 'CB', 86, false, [], 2, 'AC Milan'),
      p('col-14-6', 'Carlos Sánchez', 'Colombia', 2014, 'CDM', 87, false, ['CM'], 6, 'Elche'),
      p('col-14-7', 'Abel Aguilar', 'Colombia', 2014, 'CM', 85, false, [], 8, 'Toulouse'),
      p('col-14-8', 'Juan Cuadrado', 'Colombia', 2014, 'RM', 92, false, ['RW', 'RB', 'RWB'], 11, 'Fiorentina'),
      p('col-14-9', 'James Rodríguez', 'Colombia', 2014, 'CAM', 96, false, ['CM', 'RW', 'LW'], 10, 'Monaco'),
      p('col-14-10', 'Teófilo Gutiérrez', 'Colombia', 2014, 'ST', 87, false, ['CF'], 9, 'River Plate'),
      p('col-14-11', 'Jackson Martínez', 'Colombia', 2014, 'ST', 88, false, [], 21, 'Porto'),
      p('col-14-12', 'Juan Fernando Quintero', 'Colombia', 2014, 'CAM', 86, false, [], 20, 'Porto'),
    ]
  },

  // 2018 World Cup (Russia)
  {
    year: 2018,
    country: 'France',
    countryCode: '🇫🇷',
    flagEmoji: '🇫🇷',
    hostCountry: 'Russia',
    players: [
      p('fr-18-1', 'Hugo Lloris', 'France', 2018, 'GK', 92, true, [], 1, 'Tottenham Hotspur'),
      p('fr-18-2', 'Benjamin Pavard', 'France', 2018, 'RB', 89, false, ['CB', 'RWB'], 2, 'VfB Stuttgart'),
      p('fr-18-3', 'Lucas Hernandez', 'France', 2018, 'LB', 90, false, ['CB', 'LWB'], 21, 'Atlético Madrid'),
      p('fr-18-4', 'Raphaël Varane', 'France', 2018, 'CB', 94, false, [], 4, 'Real Madrid'),
      p('fr-18-5', 'Samuel Umtiti', 'France', 2018, 'CB', 92, false, [], 5, 'Barcelona'),
      p('fr-18-6', 'N\'Golo Kanté', 'France', 2018, 'CDM', 96, false, ['CM'], 13, 'Chelsea'),
      p('fr-18-7', 'Paul Pogba', 'France', 2018, 'CM', 95, false, ['CDM', 'CAM'], 6, 'Manchester United'),
      p('fr-18-8', 'Blaise Matuidi', 'France', 2018, 'LM', 90, false, ['CM', 'CDM'], 14, 'Juventus'),
      p('fr-18-9', 'Kylian Mbappé', 'France', 2018, 'RW', 97, false, ['ST', 'LW'], 10, 'Paris Saint-Germain'),
      p('fr-18-10', 'Antoine Griezmann', 'France', 2018, 'CAM', 96, false, ['CF', 'ST'], 7, 'Atlético Madrid'),
      p('fr-18-11', 'Olivier Giroud', 'France', 2018, 'ST', 89, false, ['CF'], 9, 'Chelsea'),
      p('fr-18-12', 'Ousmane Dembélé', 'France', 2018, 'RW', 88, false, ['LW'], 11, 'Barcelona'),
      p('fr-18-13', 'Corentin Tolisso', 'France', 2018, 'CM', 87, false, [], 12, 'Bayern Munich'),
      p('fr-18-14', 'Nabil Fekir', 'France', 2018, 'CAM', 88, false, ['ST'], 18, 'Lyon'),
    ]
  },
  {
    year: 2018,
    country: 'Croatia',
    countryCode: '🇭🇷',
    flagEmoji: '🇭🇷',
    hostCountry: 'Russia',
    players: [
      p('cro-18-1', 'Danijel Subašić', 'Croatia', 2018, 'GK', 91, true, [], 23, 'Monaco'),
      p('cro-18-2', 'Šime Vrsaljko', 'Croatia', 2018, 'RB', 89, false, ['RWB'], 2, 'Atlético Madrid'),
      p('cro-18-3', 'Ivan Strinić', 'Croatia', 2018, 'LB', 85, false, ['LWB'], 3, 'Sampdoria'),
      p('cro-18-4', 'Dejan Lovren', 'Croatia', 2018, 'CB', 89, false, [], 6, 'Liverpool'),
      p('cro-18-5', 'Domagoj Vida', 'Croatia', 2018, 'CB', 89, false, [], 21, 'Beşiktaş'),
      p('cro-18-6', 'Marcelo Brozović', 'Croatia', 2018, 'CDM', 91, false, ['CM'], 11, 'Inter Milan'),
      p('cro-18-7', 'Luka Modrić', 'Croatia', 2018, 'CM', 98, false, ['CAM'], 10, 'Real Madrid'),
      p('cro-18-8', 'Ivan Rakitić', 'Croatia', 2018, 'CM', 94, false, ['CAM', 'CDM'], 7, 'Barcelona'),
      p('cro-18-9', 'Ante Rebić', 'Croatia', 2018, 'RM', 89, false, ['RW', 'ST'], 18, 'Eintracht Frankfurt'),
      p('cro-18-10', 'Ivan Perišić', 'Croatia', 2018, 'LM', 93, false, ['LW', 'LWB'], 4, 'Inter Milan'),
      p('cro-18-11', 'Mario Mandžukić', 'Croatia', 2018, 'ST', 92, false, ['CF', 'LW'], 17, 'Juventus'),
      p('cro-18-12', 'Mateo Kovačić', 'Croatia', 2018, 'CM', 88, false, ['CAM'], 8, 'Real Madrid'),
      p('cro-18-13', 'Andrej Kramarić', 'Croatia', 2018, 'ST', 88, false, ['CAM'], 9, 'Hoffenheim'),
    ]
  },
  {
    year: 2018,
    country: 'Belgium',
    countryCode: '🇧🇪',
    flagEmoji: '🇧🇪',
    hostCountry: 'Russia',
    players: [
      p('bel-18-1', 'Thibaut Courtois', 'Belgium', 2018, 'GK', 94, true, [], 1, 'Chelsea'),
      p('bel-18-2', 'Thomas Meunier', 'Belgium', 2018, 'RWB', 89, false, ['RB', 'RM'], 15, 'Paris Saint-Germain'),
      p('bel-18-3', 'Yannick Carrasco', 'Belgium', 2018, 'LWB', 87, false, ['LM', 'LW'], 11, 'Dalian Yifang'),
      p('bel-18-4', 'Toby Alderweireld', 'Belgium', 2018, 'CB', 92, false, ['RB'], 2, 'Tottenham Hotspur'),
      p('bel-18-5', 'Vincent Kompany', 'Belgium', 2018, 'CB', 92, false, [], 4, 'Manchester City'),
      p('bel-18-6', 'Jan Vertonghen', 'Belgium', 2018, 'CB', 91, false, ['LB'], 5, 'Tottenham Hotspur'),
      p('bel-18-7', 'Axel Witsel', 'Belgium', 2018, 'CDM', 89, false, ['CM'], 6, 'Tianjin Quanjian'),
      p('bel-18-8', 'Kevin De Bruyne', 'Belgium', 2018, 'CM', 97, false, ['CAM', 'RM'], 7, 'Manchester City'),
      p('bel-18-9', 'Dries Mertens', 'Belgium', 2018, 'RW', 91, false, ['ST', 'CF'], 14, 'Napoli'),
      p('bel-18-10', 'Eden Hazard', 'Belgium', 2018, 'LW', 97, false, ['CAM', 'ST'], 10, 'Chelsea'),
      p('bel-18-11', 'Romelu Lukaku', 'Belgium', 2018, 'ST', 93, false, ['CF'], 9, 'Manchester United'),
      p('bel-18-12', 'Marouane Fellaini', 'Belgium', 2018, 'CM', 87, false, ['CAM', 'CDM'], 8, 'Manchester United'),
      p('bel-18-13', 'Michy Batshuayi', 'Belgium', 2018, 'ST', 86, false, [], 21, 'Borussia Dortmund'),
    ]
  },

  // 2022 World Cup (Qatar)
  {
    year: 2022,
    country: 'Argentina',
    countryCode: '🇦🇷',
    flagEmoji: '🇦🇷',
    hostCountry: 'Qatar',
    players: [
      p('arg-22-1', 'Emiliano Martínez', 'Argentina', 2022, 'GK', 94, true, [], 23, 'Aston Villa'),
      p('arg-22-2', 'Nahuel Molina', 'Argentina', 2022, 'RB', 89, false, ['RWB'], 26, 'Atlético Madrid'),
      p('arg-22-3', 'Marcos Acuña', 'Argentina', 2022, 'LB', 89, false, ['LWB', 'LM'], 8, 'Sevilla'),
      p('arg-22-4', 'Nicolas Otamendi', 'Argentina', 2022, 'CB', 92, false, [], 19, 'Benfica'),
      p('arg-22-5', 'Cristian Romero', 'Argentina', 2022, 'CB', 93, false, [], 13, 'Tottenham Hotspur'),
      p('arg-22-6', 'Rodrigo De Paul', 'Argentina', 2022, 'CM', 93, false, ['RM', 'CDM'], 7, 'Atlético Madrid'),
      p('arg-22-7', 'Enzo Fernández', 'Argentina', 2022, 'CM', 94, false, ['CDM', 'CAM'], 24, 'Benfica'),
      p('arg-22-8', 'Alexis Mac Allister', 'Argentina', 2022, 'CM', 92, false, ['CAM', 'LM'], 20, 'Brighton'),
      p('arg-22-9', 'Angel Di María', 'Argentina', 2022, 'RW', 95, false, ['RM', 'LW'], 11, 'Juventus'),
      p('arg-22-10', 'Lionel Messi', 'Argentina', 2022, 'RW', 99, false, ['CF', 'CAM', 'ST'], 10, 'Paris Saint-Germain'),
      p('arg-22-11', 'Julián Álvarez', 'Argentina', 2022, 'ST', 94, false, ['CF', 'LW'], 9, 'Manchester City'),
      p('arg-22-12', 'Lautaro Martínez', 'Argentina', 2022, 'ST', 90, false, ['CF'], 22, 'Inter Milan'),
      p('arg-22-13', 'Lisandro Martínez', 'Argentina', 2022, 'CB', 91, false, ['LB', 'CDM'], 25, 'Manchester United'),
      p('arg-22-14', 'Nicolas Tagliafico', 'Argentina', 2022, 'LB', 88, false, ['LWB'], 3, 'Lyon'),
      p('arg-22-15', 'Leandro Paredes', 'Argentina', 2022, 'CDM', 88, false, ['CM'], 5, 'Juventus'),
      p('arg-22-16', 'Paulo Dybala', 'Argentina', 2022, 'CAM', 89, false, ['ST', 'CF'], 21, 'AS Roma'),
    ]
  },
  {
    year: 2022,
    country: 'France',
    countryCode: '🇫🇷',
    flagEmoji: '🇫🇷',
    hostCountry: 'Qatar',
    players: [
      p('fr-22-1', 'Hugo Lloris', 'France', 2022, 'GK', 91, true, [], 1, 'Tottenham Hotspur'),
      p('fr-22-2', 'Jules Koundé', 'France', 2022, 'RB', 90, false, ['CB'], 5, 'Barcelona'),
      p('fr-22-3', 'Theo Hernandez', 'France', 2022, 'LB', 93, false, ['LWB', 'LM'], 22, 'AC Milan'),
      p('fr-22-4', 'Raphaël Varane', 'France', 2022, 'CB', 92, false, [], 4, 'Manchester United'),
      p('fr-22-5', 'Dayot Upamecano', 'France', 2022, 'CB', 90, false, [], 18, 'Bayern Munich'),
      p('fr-22-6', 'Aurelien Tchouaméni', 'France', 2022, 'CDM', 93, false, ['CM'], 8, 'Real Madrid'),
      p('fr-22-7', 'Adrien Rabiot', 'France', 2022, 'CM', 92, false, ['LM', 'CDM'], 14, 'Juventus'),
      p('fr-22-8', 'Ousmane Dembélé', 'France', 2022, 'RW', 92, false, ['RM', 'LW'], 11, 'Barcelona'),
      p('fr-22-9', 'Antoine Griezmann', 'France', 2022, 'CAM', 97, false, ['CM', 'CF', 'RM'], 7, 'Atlético Madrid'),
      p('fr-22-10', 'Kylian Mbappé', 'France', 2022, 'LW', 99, false, ['ST', 'CF'], 10, 'Paris Saint-Germain'),
      p('fr-22-11', 'Olivier Giroud', 'France', 2022, 'ST', 93, false, ['CF'], 9, 'AC Milan'),
      p('fr-22-12', 'Randal Kolo Muani', 'France', 2022, 'ST', 89, false, ['RW'], 12, 'Eintracht Frankfurt'),
      p('fr-22-13', 'Kingsley Coman', 'France', 2022, 'LW', 89, false, ['RW', 'LM'], 20, 'Bayern Munich'),
      p('fr-22-14', 'Eduardo Camavinga', 'France', 2022, 'CM', 90, false, ['LB', 'CDM'], 25, 'Real Madrid'),
      p('fr-22-15', 'Ibrahima Konaté', 'France', 2022, 'CB', 90, false, [], 24, 'Liverpool'),
    ]
  },
  {
    year: 2022,
    country: 'Morocco',
    countryCode: '🇲🇦',
    flagEmoji: '🇲🇦',
    hostCountry: 'Qatar',
    players: [
      p('mar-22-1', 'Yassine Bounou', 'Morocco', 2022, 'GK', 94, true, [], 1, 'Sevilla'),
      p('mar-22-2', 'Achraf Hakimi', 'Morocco', 2022, 'RB', 96, false, ['RWB', 'RM'], 2, 'Paris Saint-Germain'),
      p('mar-22-3', 'Noussair Mazraoui', 'Morocco', 2022, 'LB', 90, false, ['RB', 'LWB'], 3, 'Bayern Munich'),
      p('mar-22-4', 'Romain Saïss', 'Morocco', 2022, 'CB', 91, false, ['CDM'], 6, 'Beşiktaş'),
      p('mar-22-5', 'Nayef Aguerd', 'Morocco', 2022, 'CB', 90, false, [], 5, 'West Ham United'),
      p('mar-22-6', 'Sofyan Amrabat', 'Morocco', 2022, 'CDM', 95, false, ['CM'], 4, 'Fiorentina'),
      p('mar-22-7', 'Azzedine Ounahi', 'Morocco', 2022, 'CM', 93, false, ['CAM'], 8, 'Angers'),
      p('mar-22-8', 'Selim Amallah', 'Morocco', 2022, 'CM', 88, false, ['CAM'], 15, 'Standard Liège'),
      p('mar-22-9', 'Hakim Ziyech', 'Morocco', 2022, 'RW', 94, false, ['CAM', 'RM'], 7, 'Chelsea'),
      p('mar-22-10', 'Sofiane Boufal', 'Morocco', 2022, 'LW', 91, false, ['LM'], 17, 'Angers'),
      p('mar-22-11', 'Youssef En-Nesyri', 'Morocco', 2022, 'ST', 92, false, ['CF'], 19, 'Sevilla'),
      p('mar-22-12', 'Achraf Dari', 'Morocco', 2022, 'CB', 86, false, [], 20, 'Brest'),
      p('mar-22-13', 'Zakaria Aboukhlal', 'Morocco', 2022, 'RW', 87, false, ['ST'], 14, 'Toulouse'),
    ]
  },
  {
    year: 2022,
    country: 'Croatia',
    countryCode: '🇭🇷',
    flagEmoji: '🇭🇷',
    hostCountry: 'Qatar',
    players: [
      p('cro-22-1', 'Dominik Livaković', 'Croatia', 2022, 'GK', 95, true, [], 1, 'Dinamo Zagreb'),
      p('cro-22-2', 'Josip Juranović', 'Croatia', 2022, 'RB', 90, false, ['RWB'], 22, 'Celtic'),
      p('cro-22-3', 'Borna Sosa', 'Croatia', 2022, 'LB', 88, false, ['LWB'], 19, 'VfB Stuttgart'),
      p('cro-22-4', 'Joško Gvardiol', 'Croatia', 2022, 'CB', 96, false, ['LB'], 20, 'RB Leipzig'),
      p('cro-22-5', 'Dejan Lovren', 'Croatia', 2022, 'CB', 88, false, [], 6, 'Zenit Saint Petersburg'),
      p('cro-22-6', 'Marcelo Brozović', 'Croatia', 2022, 'CDM', 93, false, ['CM'], 11, 'Inter Milan'),
      p('cro-22-7', 'Luka Modrić', 'Croatia', 2022, 'CM', 97, false, ['CAM'], 10, 'Real Madrid'),
      p('cro-22-8', 'Mateo Kovačić', 'Croatia', 2022, 'CM', 93, false, ['CDM', 'CAM'], 8, 'Chelsea'),
      p('cro-22-9', 'Mario Pašalić', 'Croatia', 2022, 'RW', 88, false, ['CAM', 'CM'], 15, 'Atalanta'),
      p('cro-22-10', 'Ivan Perišić', 'Croatia', 2022, 'LW', 94, false, ['LWB', 'LM'], 4, 'Tottenham Hotspur'),
      p('cro-22-11', 'Andrej Kramarić', 'Croatia', 2022, 'ST', 89, false, ['CF', 'CAM'], 9, 'Hoffenheim'),
      p('cro-22-12', 'Mislav Oršić', 'Croatia', 2022, 'LW', 90, false, ['LM', 'ST'], 18, 'Dinamo Zagreb'),
      p('cro-22-13', 'Marko Livaja', 'Croatia', 2022, 'ST', 88, false, ['CF'], 14, 'Hajduk Split'),
      p('cro-22-14', 'Lovro Majer', 'Croatia', 2022, 'CAM', 88, false, ['CM'], 7, 'Rennes'),
    ]
  },
  {
    year: 2022,
    country: 'England',
    countryCode: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    hostCountry: 'Qatar',
    players: [
      p('eng-22-1', 'Jordan Pickford', 'England', 2022, 'GK', 91, true, [], 1, 'Everton'),
      p('eng-22-2', 'Kyle Walker', 'England', 2022, 'RB', 92, false, ['CB', 'RWB'], 2, 'Manchester City'),
      p('eng-22-3', 'Luke Shaw', 'England', 2022, 'LB', 91, false, ['CB', 'LWB'], 3, 'Manchester United'),
      p('eng-22-4', 'John Stones', 'England', 2022, 'CB', 93, false, ['CDM'], 5, 'Manchester City'),
      p('eng-22-5', 'Harry Maguire', 'England', 2022, 'CB', 90, false, [], 6, 'Manchester United'),
      p('eng-22-6', 'Declan Rice', 'England', 2022, 'CDM', 93, false, ['CM'], 4, 'West Ham United'),
      p('eng-22-7', 'Jude Bellingham', 'England', 2022, 'CM', 96, false, ['CAM', 'CDM'], 22, 'Borussia Dortmund'),
      p('eng-22-8', 'Bukayo Saka', 'England', 2022, 'RW', 95, false, ['RM', 'LW'], 17, 'Arsenal'),
      p('eng-22-9', 'Phil Foden', 'England', 2022, 'LW', 93, false, ['CAM', 'RW'], 20, 'Manchester City'),
      p('eng-22-10', 'Harry Kane', 'England', 2022, 'ST', 96, false, ['CF'], 9, 'Tottenham Hotspur'),
      p('eng-22-11', 'Marcus Rashford', 'England', 2022, 'LW', 93, false, ['ST', 'RW'], 11, 'Manchester United'),
      p('eng-22-12', 'Jack Grealish', 'England', 2022, 'LW', 89, false, ['LM', 'CAM'], 7, 'Manchester City'),
      p('eng-22-13', 'Jordan Henderson', 'England', 2022, 'CM', 88, false, ['CDM'], 8, 'Liverpool'),
      p('eng-22-14', 'Kieran Trippier', 'England', 2022, 'RB', 90, false, ['LB', 'RWB'], 12, 'Newcastle United'),
    ]
  },
  {
    year: 2022,
    country: 'Brazil',
    countryCode: '🇧🇷',
    flagEmoji: '🇧🇷',
    hostCountry: 'Qatar',
    players: [
      p('br-22-1', 'Alisson Becker', 'Brazil', 2022, 'GK', 94, true, [], 1, 'Liverpool'),
      p('br-22-2', 'Danilo', 'Brazil', 2022, 'RB', 88, false, ['LB', 'CB'], 2, 'Juventus'),
      p('br-22-3', 'Alex Sandro', 'Brazil', 2022, 'LB', 88, false, ['LWB'], 6, 'Juventus'),
      p('br-22-4', 'Thiago Silva', 'Brazil', 2022, 'CB', 94, false, [], 3, 'Chelsea'),
      p('br-22-5', 'Marquinhos', 'Brazil', 2022, 'CB', 93, false, ['CDM'], 4, 'Paris Saint-Germain'),
      p('br-22-6', 'Casemiro', 'Brazil', 2022, 'CDM', 95, false, ['CM'], 5, 'Manchester United'),
      p('br-22-7', 'Lucas Paquetá', 'Brazil', 2022, 'CM', 91, false, ['CAM'], 7, 'West Ham United'),
      p('br-22-8', 'Neymar Jr', 'Brazil', 2022, 'CAM', 97, false, ['LW', 'ST', 'CF'], 10, 'Paris Saint-Germain'),
      p('br-22-9', 'Raphinha', 'Brazil', 2022, 'RW', 91, false, ['RM'], 11, 'Barcelona'),
      p('br-22-10', 'Vinícius Júnior', 'Brazil', 2022, 'LW', 96, false, ['ST'], 20, 'Real Madrid'),
      p('br-22-11', 'Richarlison', 'Brazil', 2022, 'ST', 93, false, ['CF', 'LW'], 9, 'Tottenham Hotspur'),
      p('br-22-12', 'Rodrygo', 'Brazil', 2022, 'RW', 92, false, ['ST', 'CAM'], 21, 'Real Madrid'),
      p('br-22-13', 'Antony', 'Brazil', 2022, 'RW', 88, false, [], 19, 'Manchester United'),
      p('br-22-14', 'Gabriel Martinelli', 'Brazil', 2022, 'LW', 90, false, ['ST'], 26, 'Arsenal'),
      p('br-22-15', 'Éder Militão', 'Brazil', 2022, 'CB', 92, false, ['RB'], 14, 'Real Madrid'),
    ]
  },
  {
    year: 2022,
    country: 'Japan',
    countryCode: '🇯🇵',
    flagEmoji: '🇯🇵',
    hostCountry: 'Qatar',
    players: [
      p('jp-22-1', 'Shuichi Gonda', 'Japan', 2022, 'GK', 88, true, [], 12, 'Shimizu S-Pulse'),
      p('jp-22-2', 'Miki Yamane', 'Japan', 2022, 'RB', 85, false, [], 2, 'Kawasaki Frontale'),
      p('jp-22-3', 'Yuto Nagatomo', 'Japan', 2022, 'LB', 86, false, ['LWB'], 5, 'FC Tokyo'),
      p('jp-22-4', 'Maya Yoshida', 'Japan', 2022, 'CB', 89, false, [], 22, 'Schalke 04'),
      p('jp-22-5', 'Ko Itakura', 'Japan', 2022, 'CB', 88, false, ['CDM'], 4, 'Mönchengladbach'),
      p('jp-22-6', 'Wataru Endo', 'Japan', 2022, 'CDM', 92, false, ['CM'], 6, 'VfB Stuttgart'),
      p('jp-22-7', 'Hidemasa Morita', 'Japan', 2022, 'CM', 88, false, ['CDM'], 13, 'Sporting CP'),
      p('jp-22-8', 'Aao Tanaka', 'Japan', 2022, 'CM', 89, false, ['CAM'], 17, 'Fortuna Düsseldorf'),
      p('jp-22-9', 'Junya Ito', 'Japan', 2022, 'RW', 91, false, ['RM', 'ST'], 14, 'Reims'),
      p('jp-22-10', 'Kaoru Mitoma', 'Japan', 2022, 'LW', 94, false, ['LM', 'LWB'], 9, 'Brighton'),
      p('jp-22-11', 'Daichi Kamada', 'Japan', 2022, 'CAM', 91, false, ['CM', 'ST'], 15, 'Eintracht Frankfurt'),
      p('jp-22-12', 'Ritsu Doan', 'Japan', 2022, 'RW', 92, false, ['RM'], 8, 'SC Freiburg'),
      p('jp-22-13', 'Takuma Asano', 'Japan', 2022, 'ST', 82, false, ['RW'], 18, 'VfL Bochum'),
      p('jp-22-14', 'Takefusa Kubo', 'Japan', 2022, 'RW', 84, false, ['CAM'], 11, 'Real Sociedad'),
    ]
  },

  // 1970 World Cup Additional Participants
  {
    year: 1970,
    country: 'Uruguay',
    countryCode: '🇺🇾',
    flagEmoji: '🇺🇾',
    hostCountry: 'Mexico',
    players: [
      p('uy-70-1', 'Ladislao Mazurkiewicz', 'Uruguay', 1970, 'GK', 88, true, [], 1, 'Peñarol'),
      p('uy-70-2', 'Atilio Ancheta', 'Uruguay', 1970, 'CB', 83, false, [], 2, 'Nacional'),
      p('uy-70-3', 'Roberto Matosas', 'Uruguay', 1970, 'CB', 82, false, ['CDM'], 3, 'Peñarol'),
      p('uy-70-4', 'Luis Ubiña', 'Uruguay', 1970, 'RB', 81, false, [], 4, 'Nacional'),
      p('uy-70-5', 'Ildo Maneiro', 'Uruguay', 1970, 'CM', 83, false, ['CAM'], 8, 'Nacional'),
      p('uy-70-6', 'Pedro Rocha', 'Uruguay', 1970, 'CAM', 87, false, ['ST'], 10, 'São Paulo'),
      p('uy-70-7', 'Luis Cubilla', 'Uruguay', 1970, 'RW', 86, false, ['RM', 'ST'], 7, 'Nacional'),
    ]
  },
  {
    year: 1970,
    country: 'Peru',
    countryCode: '🇵🇪',
    flagEmoji: '🇵🇪',
    hostCountry: 'Mexico',
    players: [
      p('pe-70-1', 'Luis Rubiños', 'Peru', 1970, 'GK', 78, true, [], 1, 'Sporting Cristal'),
      p('pe-70-2', 'Héctor Chumpitaz', 'Peru', 1970, 'CB', 87, false, ['CDM'], 4, 'Universitario'),
      p('pe-70-3', 'Orlando de la Torre', 'Peru', 1970, 'CB', 80, false, [], 3, 'Sporting Cristal'),
      p('pe-70-4', 'Ramon Mifflin', 'Peru', 1970, 'CM', 81, false, [], 6, 'Sporting Cristal'),
      p('pe-70-5', 'Teófilo Cubillas', 'Peru', 1970, 'CAM', 92, false, ['CF', 'ST'], 10, 'Alianza Lima'),
      p('pe-70-6', 'Hugo Sotil', 'Peru', 1970, 'ST', 86, false, ['LW', 'CF'], 9, 'Deportivo Municipal'),
      p('pe-70-7', 'Alberto Gallardo', 'Peru', 1970, 'LW', 81, false, [], 11, 'Sporting Cristal'),
    ]
  },
  {
    year: 1970,
    country: 'Mexico',
    countryCode: '🇲🇽',
    flagEmoji: '🇲🇽',
    hostCountry: 'Mexico',
    players: [
      p('mx-70-1', 'Ignacio Calderón', 'Mexico', 1970, 'GK', 79, true, [], 1, 'Guadalajara'),
      p('mx-70-2', 'Gustavo Peña', 'Mexico', 1970, 'CB', 82, false, [], 3, 'Cruz Azul'),
      p('mx-70-3', 'Mario Pérez', 'Mexico', 1970, 'LB', 78, false, [], 5, 'America'),
      p('mx-70-4', 'Héctor Pulido', 'Mexico', 1970, 'CM', 80, false, ['CDM'], 6, 'Cruz Azul'),
      p('mx-70-5', 'Enrique Borja', 'Mexico', 1970, 'ST', 81, false, [], 9, 'America'),
      p('mx-70-6', 'Javier Valdivia', 'Mexico', 1970, 'RW', 80, false, [], 11, 'Guadalajara'),
    ]
  },

  // 1974 World Cup Additional Participants
  {
    year: 1974,
    country: 'Yugoslavia',
    countryCode: '🇷🇸',
    flagEmoji: '🇷🇸',
    hostCountry: 'West Germany',
    players: [
      p('yu-74-1', 'Enver Marić', 'Yugoslavia', 1974, 'GK', 80, true, [], 1, 'Velež Mostar'),
      p('yu-74-2', 'Ivan Buljan', 'Yugoslavia', 1974, 'RB', 82, false, ['CB'], 2, 'Hajduk Split'),
      p('yu-74-3', 'Josip Katalinski', 'Yugoslavia', 1974, 'CB', 83, false, [], 5, 'Željezničar'),
      p('yu-74-4', 'Branko Oblak', 'Yugoslavia', 1974, 'CM', 84, false, ['CAM'], 10, 'Hajduk Split'),
      p('yu-74-5', 'Dragan Džajić', 'Yugoslavia', 1974, 'LW', 88, false, ['LM'], 11, 'Red Star Belgrade'),
      p('yu-74-6', 'Ivica Šurjak', 'Yugoslavia', 1974, 'LM', 83, false, ['ST'], 8, 'Hajduk Split'),
    ]
  },
  {
    year: 1974,
    country: 'Scotland',
    countryCode: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    hostCountry: 'West Germany',
    players: [
      p('sc-74-1', 'David Harvey', 'Scotland', 1974, 'GK', 81, true, [], 1, 'Leeds United'),
      p('sc-74-2', 'Sandy Jardine', 'Scotland', 1974, 'RB', 82, false, [], 2, 'Rangers'),
      p('sc-74-3', 'Billy Bremner', 'Scotland', 1974, 'CM', 87, false, ['CDM'], 4, 'Leeds United'),
      p('sc-74-4', 'Kenny Dalglish', 'Scotland', 1974, 'ST', 88, false, ['CF', 'CAM'], 8, 'Celtic'),
      p('sc-74-5', 'Peter Lorimer', 'Scotland', 1974, 'RW', 84, false, [], 11, 'Leeds United'),
      p('sc-74-6', 'Joe Jordan', 'Scotland', 1974, 'ST', 82, false, [], 9, 'Leeds United'),
    ]
  },

  // 1978 World Cup Additional Participants
  {
    year: 1978,
    country: 'Austria',
    countryCode: '🇦🇹',
    flagEmoji: '🇦🇹',
    hostCountry: 'Argentina',
    players: [
      p('at-78-1', 'Friedl Koncilia', 'Austria', 1978, 'GK', 82, true, [], 1, 'Innsbruck'),
      p('at-78-2', 'Bruno Pezzey', 'Austria', 1978, 'CB', 85, false, [], 3, 'Wacker Innsbruck'),
      p('at-78-3', 'Herbert Prohaska', 'Austria', 1978, 'CM', 86, false, ['CAM'], 8, 'Austria Wien'),
      p('at-78-4', 'Hans Krankl', 'Austria', 1978, 'ST', 88, false, [], 9, 'Rapid Wien'),
      p('at-78-5', 'Walter Schachner', 'Austria', 1978, 'RW', 82, false, [], 18, 'Alpine Donawitz'),
    ]
  },
  {
    year: 1978,
    country: 'Tunisia',
    countryCode: '🇹🇳',
    flagEmoji: '🇹🇳',
    hostCountry: 'Argentina',
    players: [
      p('tn-78-1', 'Sadok Sassi', 'Tunisia', 1978, 'GK', 76, true, [], 22, 'Club Africain'),
      p('tn-78-2', 'Mokhtar Dhouieb', 'Tunisia', 1978, 'RB', 76, false, [], 2, 'CS Sfaxien'),
      p('tn-78-3', 'Tarak Dhiab', 'Tunisia', 1978, 'CAM', 81, false, ['CM'], 10, 'Espérance'),
      p('tn-78-4', 'Ali Kaabi', 'Tunisia', 1978, 'LB', 77, false, [], 3, 'COT'),
      p('tn-78-5', 'Néjib Ghommidh', 'Tunisia', 1978, 'CDM', 78, false, [], 6, 'Club Africain'),
    ]
  },

  // 1982 World Cup Additional Participants
  {
    year: 1982,
    country: 'Algeria',
    countryCode: '🇩🇿',
    flagEmoji: '🇩🇿',
    hostCountry: 'Spain',
    players: [
      p('dz-82-1', 'Mehdi Cerbah', 'Algeria', 1982, 'GK', 77, true, [], 1, 'RC Kouba'),
      p('dz-82-2', 'Mahmoud Guendouz', 'Algeria', 1982, 'CB', 80, false, [], 2, 'MA Hussein Dey'),
      p('dz-82-3', 'Lakhdar Belloumi', 'Algeria', 1982, 'CAM', 86, false, ['CM'], 10, 'GC Mascara'),
      p('dz-82-4', 'Rabah Madjer', 'Algeria', 1982, 'ST', 85, false, ['LW', 'RW'], 11, 'MA Hussein Dey'),
      p('dz-82-5', 'Mustapha Zidane', 'Algeria', 1982, 'CM', 79, false, [], 8, 'USM Alger'),
    ]
  },
  {
    year: 1982,
    country: 'Northern Ireland',
    countryCode: '🇬🇧',
    flagEmoji: '🇬🇧',
    hostCountry: 'Spain',
    players: [
      p('nir-82-1', 'Pat Jennings', 'Northern Ireland', 1982, 'GK', 88, true, [], 1, 'Arsenal'),
      p('nir-82-2', 'Mal Donaghy', 'Northern Ireland', 1982, 'LB', 80, false, ['CB'], 3, 'Luton Town'),
      p('nir-82-3', 'Martin O\'Neill', 'Northern Ireland', 1982, 'CM', 82, false, ['RM'], 16, 'Norwich City'),
      p('nir-82-4', 'Norman Whiteside', 'Northern Ireland', 1982, 'CAM', 84, false, ['ST'], 11, 'Manchester United'),
      p('nir-82-5', 'Gerry Armstrong', 'Northern Ireland', 1982, 'ST', 81, false, [], 9, 'Watford'),
    ]
  },
  {
    year: 1982,
    country: 'Honduras',
    countryCode: '🇭🇳',
    flagEmoji: '🇭🇳',
    hostCountry: 'Spain',
    players: [
      p('hn-82-1', 'Julio César Arzú', 'Honduras', 1982, 'GK', 76, true, [], 1, 'Real España'),
      p('hn-82-2', 'Allan Costly', 'Honduras', 1982, 'CB', 78, false, [], 5, 'Real España'),
      p('hn-82-3', 'Gilberto Yearwood', 'Honduras', 1982, 'CDM', 80, false, ['CM'], 6, 'Elche'),
      p('hn-82-4', 'Ramón Maradiaga', 'Honduras', 1982, 'CM', 79, false, [], 10, 'Motagua'),
      p('hn-82-5', 'Eduardo Laing', 'Honduras', 1982, 'ST', 77, false, [], 11, 'Platense'),
    ]
  },

  // 1986 World Cup Additional Participants
  {
    year: 1986,
    country: 'Morocco',
    countryCode: '🇲🇦',
    flagEmoji: '🇲🇦',
    hostCountry: 'Mexico',
    players: [
      p('ma-86-1', 'Badou Zaki', 'Morocco', 1986, 'GK', 86, true, [], 1, 'WAC Casablanca'),
      p('ma-86-2', 'Labid Khalifa', 'Morocco', 1986, 'RB', 80, false, [], 2, 'KAC Kénitra'),
      p('ma-86-3', 'Mustapha El Biyaz', 'Morocco', 1986, 'CB', 81, false, [], 3, 'KAC Marrakesh'),
      p('ma-86-4', 'Mohammed Timoumi', 'Morocco', 1986, 'CAM', 85, false, ['CM'], 10, 'FAR Rabat'),
      p('ma-86-5', 'Aziz Bouderbala', 'Morocco', 1986, 'LW', 84, false, ['CAM'], 11, 'Sion'),
      p('ma-86-6', 'Abderrazak Khairi', 'Morocco', 1986, 'ST', 82, false, [], 17, 'FAR Rabat'),
    ]
  },
  {
    year: 1986,
    country: 'Denmark',
    countryCode: '🇩🇰',
    flagEmoji: '🇩🇰',
    hostCountry: 'Mexico',
    players: [
      p('dk-86-1', 'Ole Qvist', 'Denmark', 1986, 'GK', 81, true, [], 1, 'KB'),
      p('dk-86-2', 'Morten Olsen', 'Denmark', 1986, 'CB', 86, false, ['CDM'], 4, 'Anderlecht'),
      p('dk-86-3', 'Søren Lerby', 'Denmark', 1986, 'CM', 85, false, ['CDM'], 6, 'Bayern Munich'),
      p('dk-86-4', 'Michael Laudrup', 'Denmark', 1986, 'CAM', 90, false, ['CF', 'LW'], 11, 'Juventus'),
      p('dk-86-5', 'Preben Elkjær', 'Denmark', 1986, 'ST', 88, false, [], 10, 'Hellas Verona'),
      p('dk-86-6', 'Frank Arnesen', 'Denmark', 1986, 'RM', 85, false, ['CAM'], 7, 'PSV Eindhoven'),
    ]
  },
  {
    year: 1986,
    country: 'South Korea',
    countryCode: '🇰🇷',
    flagEmoji: '🇰🇷',
    hostCountry: 'Mexico',
    players: [
      p('kr-86-1', 'Cho Byung-deuk', 'South Korea', 1986, 'GK', 75, true, [], 21, 'Hallelujah'),
      p('kr-86-2', 'Park Kyung-hoon', 'South Korea', 1986, 'RB', 76, false, [], 2, 'POSCO Atoms'),
      p('kr-86-3', 'Huh Jung-moo', 'South Korea', 1986, 'CDM', 79, false, ['CM'], 17, 'Hyundai Horang-i'),
      p('kr-86-4', 'Kim Joo-sung', 'South Korea', 1986, 'LM', 81, false, ['LW'], 16, 'Daewoo Royals'),
      p('kr-86-5', 'Cha Bum-kun', 'South Korea', 1986, 'ST', 87, false, ['CF'], 11, 'Bayer Leverkusen'),
    ]
  },

  // 1990 World Cup Additional Participants
  {
    year: 1990,
    country: 'Costa Rica',
    countryCode: '🇨🇷',
    flagEmoji: '🇨🇷',
    hostCountry: 'Italy',
    players: [
      p('cr-90-1', 'Luis Gabelo Conejo', 'Costa Rica', 1990, 'GK', 85, true, [], 1, 'Cartaginés'),
      p('cr-90-2', 'Róger Flores', 'Costa Rica', 1990, 'CB', 80, false, [], 3, 'Saprissa'),
      p('cr-90-3', 'Juan Cayasso', 'Costa Rica', 1990, 'CAM', 81, false, ['LM'], 10, 'Saprissa'),
      p('cr-90-4', 'Hernán Medford', 'Costa Rica', 1990, 'ST', 82, false, ['RW'], 11, 'Saprissa'),
      p('cr-90-5', 'Claudio Jara', 'Costa Rica', 1990, 'ST', 79, false, [], 9, 'Herediano'),
    ]
  },
  {
    year: 1990,
    country: 'Republic of Ireland',
    countryCode: '🇮🇪',
    flagEmoji: '🇮🇪',
    hostCountry: 'Italy',
    players: [
      p('ie-90-1', 'Packie Bonner', 'Republic of Ireland', 1990, 'GK', 83, true, [], 1, 'Celtic'),
      p('ie-90-2', 'Paul McGrath', 'Republic of Ireland', 1990, 'CB', 87, false, ['CDM'], 5, 'Aston Villa'),
      p('ie-90-3', 'Ray Houghton', 'Republic of Ireland', 1990, 'RM', 82, false, ['CM'], 8, 'Liverpool'),
      p('ie-90-4', 'Kevin Sheedy', 'Republic of Ireland', 1990, 'LM', 82, false, [], 11, 'Everton'),
      p('ie-90-5', 'John Aldridge', 'Republic of Ireland', 1990, 'ST', 83, false, [], 9, 'Real Sociedad'),
    ]
  },
  {
    year: 1990,
    country: 'Colombia',
    countryCode: '🇨🇴',
    flagEmoji: '🇨🇴',
    hostCountry: 'Italy',
    players: [
      p('co-90-1', 'René Higuita', 'Colombia', 1990, 'GK', 85, true, [], 1, 'Atlético Nacional'),
      p('co-90-2', 'Luis Carlos Perea', 'Colombia', 1990, 'CB', 82, false, [], 2, 'Atlético Nacional'),
      p('co-90-3', 'Carlos Valderrama', 'Colombia', 1990, 'CAM', 89, false, ['CM'], 10, 'Montpellier'),
      p('co-90-4', 'Freddy Rincón', 'Colombia', 1990, 'CM', 85, false, ['RM'], 19, 'América de Cali'),
      p('co-90-5', 'Arnold Iguarán', 'Colombia', 1990, 'ST', 82, false, [], 16, 'Millonarios'),
    ]
  },

  // 1994 World Cup Additional Participants
  {
    year: 1994,
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    flagEmoji: '🇸🇦',
    hostCountry: 'USA',
    players: [
      p('sa-94-1', 'Mohamed Al-Deayea', 'Saudi Arabia', 1994, 'GK', 82, true, [], 1, 'Al-Ta\'ee'),
      p('sa-94-2', 'Mohammed Al-Khilaiwi', 'Saudi Arabia', 1994, 'CB', 78, false, [], 5, 'Al-Ittihad'),
      p('sa-94-3', 'Fuad Amin', 'Saudi Arabia', 1994, 'CDM', 81, false, ['CM'], 6, 'Al-Shabab'),
      p('sa-94-4', 'Saeed Al-Owairan', 'Saudi Arabia', 1994, 'CAM', 85, false, ['ST'], 10, 'Al-Shabab'),
      p('sa-94-5', 'Sami Al-Jaber', 'Saudi Arabia', 1994, 'ST', 82, false, [], 9, 'Al-Hilal'),
    ]
  },
  {
    year: 1994,
    country: 'USA',
    countryCode: '🇺🇸',
    flagEmoji: '🇺🇸',
    hostCountry: 'USA',
    players: [
      p('us-94-1', 'Tony Meola', 'USA', 1994, 'GK', 81, true, [], 1, 'US Soccer'),
      p('us-94-2', 'Alexi Lalas', 'USA', 1994, 'CB', 81, false, [], 22, 'Padova'),
      p('us-94-3', 'Marcelo Balboa', 'USA', 1994, 'CB', 82, false, [], 17, 'US Soccer'),
      p('us-94-4', 'Tab Ramos', 'USA', 1994, 'CAM', 83, false, ['RM'], 10, 'Real Betis'),
      p('us-94-5', 'Eric Wynalda', 'USA', 1994, 'ST', 81, false, [], 11, 'Saarbrücken'),
    ]
  },
  {
    year: 1994,
    country: 'Nigeria',
    countryCode: '🇳🇬',
    flagEmoji: '🇳🇬',
    hostCountry: 'USA',
    players: [
      p('ng-94-1', 'Peter Rufai', 'Nigeria', 1994, 'GK', 81, true, [], 1, 'Farense'),
      p('ng-94-2', 'Stephen Keshi', 'Nigeria', 1994, 'CB', 83, false, [], 4, 'Molenbeek'),
      p('ng-94-3', 'Sunday Oliseh', 'Nigeria', 1994, 'CDM', 83, false, ['CM'], 15, 'Liège'),
      p('ng-94-4', 'Emmanuel Amunike', 'Nigeria', 1994, 'LW', 84, false, ['LM'], 11, 'Zamalek'),
      p('ng-94-5', 'Rashidi Yekini', 'Nigeria', 1994, 'ST', 86, false, [], 9, 'Vitória de Setúbal'),
      p('ng-94-6', 'Daniel Amokachi', 'Nigeria', 1994, 'ST', 84, false, ['CF'], 14, 'Club Brugge'),
    ]
  },

  // 1998 World Cup Additional Participants
  {
    year: 1998,
    country: 'Japan',
    countryCode: '🇯🇵',
    flagEmoji: '🇯🇵',
    hostCountry: 'France',
    players: [
      p('jp-98-1', 'Yoshikatsu Kawaguchi', 'Japan', 1998, 'GK', 80, true, [], 20, 'Yokohama Marinos'),
      p('jp-98-2', 'Masami Ihara', 'Japan', 1998, 'CB', 80, false, [], 4, 'Yokohama Marinos'),
      p('jp-98-3', 'Hidetoshi Nakata', 'Japan', 1998, 'CAM', 86, false, ['CM'], 8, 'Bellmare Hiratsuka'),
      p('jp-98-4', 'Hiroshi Nanami', 'Japan', 1998, 'CM', 80, false, ['LM'], 10, 'Júbilo Iwata'),
      p('jp-98-5', 'Masashi Nakayama', 'Japan', 1998, 'ST', 81, false, [], 9, 'Júbilo Iwata'),
    ]
  },
  {
    year: 1998,
    country: 'South Africa',
    countryCode: '🇿🇦',
    flagEmoji: '🇿🇦',
    hostCountry: 'France',
    players: [
      p('za-98-1', 'Hans Vonk', 'South Africa', 1998, 'GK', 79, true, [], 1, 'Heerenveen'),
      p('za-98-2', 'Lucas Radebe', 'South Africa', 1998, 'CB', 85, false, [], 19, 'Leeds United'),
      p('za-98-3', 'Mark Fish', 'South Africa', 1998, 'CB', 82, false, [], 5, 'Bolton Wanderers'),
      p('za-98-4', 'John Moshoeu', 'South Africa', 1998, 'CAM', 81, false, [], 10, 'Fenerbahçe'),
      p('za-98-5', 'Benni McCarthy', 'South Africa', 1998, 'ST', 83, false, [], 17, 'Ajax'),
    ]
  },
  {
    year: 1998,
    country: 'Jamaica',
    countryCode: '🇯🇲',
    flagEmoji: '🇯🇲',
    hostCountry: 'France',
    players: [
      p('jm-98-1', 'Warren Barrett', 'Jamaica', 1998, 'GK', 77, true, [], 1, 'Violet Kickers'),
      p('jm-98-2', 'Ian Goodison', 'Jamaica', 1998, 'CB', 78, false, [], 15, 'Olympic Gardens'),
      p('jm-98-3', 'Theodore Whitmore', 'Jamaica', 1998, 'CM', 81, false, ['CAM'], 11, 'Violet Kickers'),
      p('jm-98-4', 'Robbie Earle', 'Jamaica', 1998, 'CM', 80, false, [], 6, 'Wimbledon'),
      p('jm-98-5', 'Deon Burton', 'Jamaica', 1998, 'ST', 78, false, [], 18, 'Derby County'),
    ]
  },

  // 2002 World Cup Additional Participants
  {
    year: 2002,
    country: 'Senegal',
    countryCode: '🇸🇳',
    flagEmoji: '🇸🇳',
    hostCountry: 'South Korea & Japan',
    players: [
      p('sn-02-1', 'Tony Sylva', 'Senegal', 2002, 'GK', 80, true, [], 1, 'Monaco'),
      p('sn-02-2', 'Lamine Diatta', 'Senegal', 2002, 'CB', 81, false, [], 13, 'Rennes'),
      p('sn-02-3', 'Papa Bouba Diop', 'Senegal', 2002, 'CDM', 83, false, ['CM'], 19, 'Lens'),
      p('sn-02-4', 'Khalilou Fadiga', 'Senegal', 2002, 'LM', 84, false, ['CAM'], 10, 'Auxerre'),
      p('sn-02-5', 'El Hadji Diouf', 'Senegal', 2002, 'ST', 86, false, ['RW', 'CF'], 11, 'Lens'),
    ]
  },
  {
    year: 2002,
    country: 'South Korea',
    countryCode: '🇰🇷',
    flagEmoji: '🇰🇷',
    hostCountry: 'South Korea & Japan',
    players: [
      p('kr-02-1', 'Lee Woon-jae', 'South Korea', 2002, 'GK', 83, true, [], 1, 'Suwon Bluewings'),
      p('kr-02-2', 'Hong Myung-bo', 'South Korea', 2002, 'CB', 86, false, ['CDM'], 20, 'Pohang Steelers'),
      p('kr-02-3', 'Park Ji-sung', 'South Korea', 2002, 'RM', 85, false, ['LM', 'CM'], 21, 'Kyoto Sanga'),
      p('kr-02-4', 'Ahn Jung-hwan', 'South Korea', 2002, 'ST', 84, false, ['CF'], 19, 'Perugia'),
      p('kr-02-5', 'Seol Ki-hyeon', 'South Korea', 2002, 'LW', 82, false, ['ST'], 9, 'Anderlecht'),
    ]
  },
  {
    year: 2002,
    country: 'USA',
    countryCode: '🇺🇸',
    flagEmoji: '🇺🇸',
    hostCountry: 'South Korea & Japan',
    players: [
      p('us-02-1', 'Brad Friedel', 'USA', 2002, 'GK', 86, true, [], 1, 'Blackburn Rovers'),
      p('us-02-2', 'Eddie Pope', 'USA', 2002, 'CB', 82, false, [], 23, 'DC United'),
      p('us-02-3', 'Claudio Reyna', 'USA', 2002, 'CM', 84, false, ['CDM'], 10, 'Sunderland'),
      p('us-02-4', 'Landon Donovan', 'USA', 2002, 'CAM', 85, false, ['ST', 'RM'], 21, 'San Jose Earthquakes'),
      p('us-02-5', 'Brian McBride', 'USA', 2002, 'ST', 83, false, [], 20, 'Columbus Crew'),
    ]
  },

  // 2006 World Cup Additional Participants
  {
    year: 2006,
    country: 'Ghana',
    countryCode: '🇬🇭',
    flagEmoji: '🇬🇭',
    hostCountry: 'Germany',
    players: [
      p('gh-06-1', 'Richard Kingson', 'Ghana', 2006, 'GK', 79, true, [], 22, 'Ankaraspor'),
      p('gh-06-2', 'John Mensah', 'Ghana', 2006, 'CB', 82, false, [], 5, 'Rennes'),
      p('gh-06-3', 'Michael Essien', 'Ghana', 2006, 'CM', 90, false, ['CDM'], 8, 'Chelsea'),
      p('gh-06-4', 'Stephen Appiah', 'Ghana', 2006, 'CM', 85, false, ['CAM'], 10, 'Fenerbahçe'),
      p('gh-06-5', 'Sulley Muntari', 'Ghana', 2006, 'LM', 84, false, ['CM'], 11, 'Udinese'),
      p('gh-06-6', 'Asamoah Gyan', 'Ghana', 2006, 'ST', 83, false, [], 3, 'Modena'),
    ]
  },
  {
    year: 2006,
    country: 'Australia',
    countryCode: '🇦🇺',
    flagEmoji: '🇦🇺',
    hostCountry: 'Germany',
    players: [
      p('au-06-1', 'Mark Schwarzer', 'Australia', 2006, 'GK', 85, true, [], 1, 'Middlesbrough'),
      p('au-06-2', 'Lucas Neill', 'Australia', 2006, 'CB', 82, false, ['RB'], 2, 'Blackburn Rovers'),
      p('au-06-3', 'Tim Cahill', 'Australia', 2006, 'CAM', 86, false, ['ST', 'CM'], 4, 'Everton'),
      p('au-06-4', 'Harry Kewell', 'Australia', 2006, 'LW', 86, false, ['CAM'], 10, 'Liverpool'),
      p('au-06-5', 'Mark Viduka', 'Australia', 2006, 'ST', 85, false, [], 9, 'Middlesbrough'),
    ]
  },
  {
    year: 2006,
    country: 'Ivory Coast',
    countryCode: '🇨🇮',
    flagEmoji: '🇨🇮',
    hostCountry: 'Germany',
    players: [
      p('ci-06-1', 'Jean-Jacques Tizié', 'Ivory Coast', 2006, 'GK', 78, true, [], 1, 'Espérance'),
      p('ci-06-2', 'Kolo Touré', 'Ivory Coast', 2006, 'CB', 86, false, [], 4, 'Arsenal'),
      p('ci-06-3', 'Yaya Touré', 'Ivory Coast', 2006, 'CM', 85, false, ['CDM'], 19, 'Metalurh Donetsk'),
      p('ci-06-4', 'Didier Zokora', 'Ivory Coast', 2006, 'CDM', 82, false, [], 5, 'Saint-Étienne'),
      p('ci-06-5', 'Didier Drogba', 'Ivory Coast', 2006, 'ST', 91, false, [], 11, 'Chelsea'),
    ]
  },

  // 2010 World Cup Additional Participants
  {
    year: 2010,
    country: 'Ghana',
    countryCode: '🇬🇭',
    flagEmoji: '🇬🇭',
    hostCountry: 'South Africa',
    players: [
      p('gh-10-1', 'Richard Kingson', 'Ghana', 2010, 'GK', 81, true, [], 22, 'Wigan Athletic'),
      p('gh-10-2', 'John Mensah', 'Ghana', 2010, 'CB', 83, false, [], 5, 'Sunderland'),
      p('gh-10-3', 'Kwadwo Asamoah', 'Ghana', 2010, 'CM', 84, false, ['LM', 'LB'], 21, 'Udinese'),
      p('gh-10-4', 'Kevin-Prince Boateng', 'Ghana', 2010, 'CAM', 84, false, ['CM', 'ST'], 23, 'Portsmouth'),
      p('gh-10-5', 'Asamoah Gyan', 'Ghana', 2010, 'ST', 87, false, [], 3, 'Rennes'),
    ]
  },
  {
    year: 2010,
    country: 'South Africa',
    countryCode: '🇿🇦',
    flagEmoji: '🇿🇦',
    hostCountry: 'South Africa',
    players: [
      p('za-10-1', 'Itumeleng Khune', 'South Africa', 2010, 'GK', 82, true, [], 16, 'Kaizer Chiefs'),
      p('za-10-2', 'Aaron Mokoena', 'South Africa', 2010, 'CB', 80, false, ['CDM'], 4, 'Portsmouth'),
      p('za-10-3', 'Siphiwe Tshabalala', 'South Africa', 2010, 'LM', 83, false, ['LW'], 8, 'Kaizer Chiefs'),
      p('za-10-4', 'Steven Pienaar', 'South Africa', 2010, 'CAM', 84, false, ['LM'], 10, 'Everton'),
      p('za-10-5', 'Katlego Mphela', 'South Africa', 2010, 'ST', 80, false, [], 9, 'Mamelodi Sundowns'),
    ]
  },

  // 2014 World Cup Additional Participants
  {
    year: 2014,
    country: 'Costa Rica',
    countryCode: '🇨🇷',
    flagEmoji: '🇨🇷',
    hostCountry: 'Brazil',
    players: [
      p('cr-14-1', 'Keylor Navas', 'Costa Rica', 2014, 'GK', 89, true, [], 1, 'Levante'),
      p('cr-14-2', 'Giancarlo González', 'Costa Rica', 2014, 'CB', 82, false, [], 3, 'Columbus Crew'),
      p('cr-14-3', 'Óscar Duarte', 'Costa Rica', 2014, 'CB', 81, false, [], 6, 'Club Brugge'),
      p('cr-14-4', 'Bryan Ruiz', 'Costa Rica', 2014, 'CAM', 85, false, ['CF', 'RM'], 10, 'PSV Eindhoven'),
      p('cr-14-5', 'Joel Campbell', 'Costa Rica', 2014, 'ST', 83, false, ['RW'], 9, 'Olympiacos'),
    ]
  },
  {
    year: 2014,
    country: 'USA',
    countryCode: '🇺🇸',
    flagEmoji: '🇺🇸',
    hostCountry: 'Brazil',
    players: [
      p('us-14-1', 'Tim Howard', 'USA', 2014, 'GK', 87, true, [], 1, 'Everton'),
      p('us-14-2', 'Fabian Johnson', 'USA', 2014, 'RB', 82, false, ['LB', 'RM'], 23, 'Hoffenheim'),
      p('us-14-3', 'Jermaine Jones', 'USA', 2014, 'CDM', 83, false, ['CM'], 13, 'Beşiktaş'),
      p('us-14-4', 'Michael Bradley', 'USA', 2014, 'CM', 83, false, ['CDM'], 4, 'Toronto FC'),
      p('us-14-5', 'Clint Dempsey', 'USA', 2014, 'ST', 85, false, ['CAM', 'CF'], 8, 'Seattle Sounders'),
    ]
  },

  // 2018 World Cup Additional Participants
  {
    year: 2018,
    country: 'Senegal',
    countryCode: '🇸🇳',
    flagEmoji: '🇸🇳',
    hostCountry: 'Russia',
    players: [
      p('sn-18-1', 'Khadim N\'Diaye', 'Senegal', 2018, 'GK', 81, true, [], 16, 'Horoya'),
      p('sn-18-2', 'Kalidou Koulibaly', 'Senegal', 2018, 'CB', 88, false, [], 3, 'Napoli'),
      p('sn-18-3', 'Idrissa Gueye', 'Senegal', 2018, 'CDM', 84, false, ['CM'], 5, 'Everton'),
      p('sn-18-4', 'Ismaïla Sarr', 'Senegal', 2018, 'RW', 82, false, ['RM'], 18, 'Rennes'),
      p('sn-18-5', 'Sadio Mané', 'Senegal', 2018, 'LW', 90, false, ['ST', 'LM'], 10, 'Liverpool'),
    ]
  },
  {
    year: 2018,
    country: 'Iceland',
    countryCode: '🇮🇸',
    flagEmoji: '🇮🇸',
    hostCountry: 'Russia',
    players: [
      p('is-18-1', 'Hannes Halldórsson', 'Iceland', 2018, 'GK', 81, true, [], 1, 'Randers'),
      p('is-18-2', 'Ragnar Sigurðsson', 'Iceland', 2018, 'CB', 81, false, [], 6, 'Rostov'),
      p('is-18-3', 'Aron Gunnarsson', 'Iceland', 2018, 'CDM', 80, false, ['CM'], 17, 'Cardiff City'),
      p('is-18-4', 'Gylfi Sigurðsson', 'Iceland', 2018, 'CAM', 86, false, ['CM'], 10, 'Everton'),
      p('is-18-5', 'Alfreð Finnbogason', 'Iceland', 2018, 'ST', 81, false, [], 11, 'FC Augsburg'),
    ]
  },
  {
    year: 2018,
    country: 'Egypt',
    countryCode: '🇪🇬',
    flagEmoji: '🇪🇬',
    hostCountry: 'Russia',
    players: [
      p('eg-18-1', 'Mohamed El-Shenawy', 'Egypt', 2018, 'GK', 80, true, [], 23, 'Al Ahly'),
      p('eg-18-2', 'Ahmed Hegazi', 'Egypt', 2018, 'CB', 81, false, [], 6, 'West Bromwich Albion'),
      p('eg-18-3', 'Mohamed Elneny', 'Egypt', 2018, 'CDM', 82, false, ['CM'], 17, 'Arsenal'),
      p('eg-18-4', 'Trezeguet', 'Egypt', 2018, 'LW', 81, false, ['LM'], 21, 'Kasımpaşa'),
      p('eg-18-5', 'Mohamed Salah', 'Egypt', 2018, 'RW', 91, false, ['ST'], 10, 'Liverpool'),
    ]
  },

  // 2022 World Cup Additional Participants
  {
    year: 2022,
    country: 'Morocco',
    countryCode: '🇲🇦',
    flagEmoji: '🇲🇦',
    hostCountry: 'Qatar',
    players: [
      p('ma-22-1', 'Yassine Bounou', 'Morocco', 2022, 'GK', 88, true, [], 1, 'Sevilla'),
      p('ma-22-2', 'Achraf Hakimi', 'Morocco', 2022, 'RB', 88, false, ['RWB', 'RM'], 2, 'Paris Saint-Germain'),
      p('ma-22-3', 'Romain Saïss', 'Morocco', 2022, 'CB', 84, false, [], 6, 'Beşiktaş'),
      p('ma-22-4', 'Nayef Aguerd', 'Morocco', 2022, 'CB', 84, false, [], 5, 'West Ham United'),
      p('ma-22-5', 'Sofyan Amrabat', 'Morocco', 2022, 'CDM', 86, false, ['CM'], 4, 'Fiorentina'),
      p('ma-22-6', 'Azzedine Ounahi', 'Morocco', 2022, 'CM', 83, false, ['CAM'], 8, 'Angers'),
      p('ma-22-7', 'Hakim Ziyech', 'Morocco', 2022, 'RW', 86, false, ['CAM'], 7, 'Chelsea'),
      p('ma-22-8', 'Youssef En-Nesyri', 'Morocco', 2022, 'ST', 84, false, [], 19, 'Sevilla'),
    ]
  },
  {
    year: 2022,
    country: 'Saudi Arabia',
    countryCode: '🇸🇦',
    flagEmoji: '🇸🇦',
    hostCountry: 'Qatar',
    players: [
      p('sa-22-1', 'Mohammed Al-Owais', 'Saudi Arabia', 2022, 'GK', 82, true, [], 21, 'Al-Hilal'),
      p('sa-22-2', 'Saud Abdulhamid', 'Saudi Arabia', 2022, 'RB', 80, false, ['RWB'], 12, 'Al-Hilal'),
      p('sa-22-3', 'Ali Al-Bulaihi', 'Saudi Arabia', 2022, 'CB', 79, false, [], 5, 'Al-Hilal'),
      p('sa-22-4', 'Mohamed Kanno', 'Saudi Arabia', 2022, 'CM', 80, false, ['CDM'], 23, 'Al-Hilal'),
      p('sa-22-5', 'Salem Al-Dawsari', 'Saudi Arabia', 2022, 'LW', 83, false, ['LM'], 10, 'Al-Hilal'),
      p('sa-22-6', 'Saleh Al-Shehri', 'Saudi Arabia', 2022, 'ST', 80, false, [], 11, 'Al-Hilal'),
    ]
  },
  {
    year: 2022,
    country: 'Australia',
    countryCode: '🇦🇺',
    flagEmoji: '🇦🇺',
    hostCountry: 'Qatar',
    players: [
      p('au-22-1', 'Mathew Ryan', 'Australia', 2022, 'GK', 82, true, [], 1, 'Copenhagen'),
      p('au-22-2', 'Harry Souttar', 'Australia', 2022, 'CB', 81, false, [], 19, 'Stoke City'),
      p('au-22-3', 'Aaron Mooy', 'Australia', 2022, 'CM', 82, false, ['CDM'], 13, 'Celtic'),
      p('au-22-4', 'Jackson Irvine', 'Australia', 2022, 'CM', 80, false, [], 22, 'FC St. Pauli'),
      p('au-22-5', 'Craig Goodwin', 'Australia', 2022, 'LW', 80, false, ['LM'], 23, 'Adelaide United'),
      p('au-22-6', 'Mitchell Duke', 'Australia', 2022, 'ST', 78, false, [], 15, 'Fagiano Okayama'),
    ]
  },
  {
    year: 2022,
    country: 'Canada',
    countryCode: '🇨🇦',
    flagEmoji: '🇨🇦',
    hostCountry: 'Qatar',
    players: [
      p('ca-22-1', 'Milan Borjan', 'Canada', 2022, 'GK', 80, true, [], 18, 'Red Star Belgrade'),
      p('ca-22-2', 'Alistair Johnston', 'Canada', 2022, 'RB', 80, false, ['CB'], 2, 'CF Montréal'),
      p('ca-22-3', 'Stephen Eustáquio', 'Canada', 2022, 'CDM', 82, false, ['CM'], 7, 'Porto'),
      p('ca-22-4', 'Alphonso Davies', 'Canada', 2022, 'LB', 86, false, ['LM', 'LW'], 19, 'Bayern Munich'),
      p('ca-22-5', 'Jonathan David', 'Canada', 2022, 'ST', 84, false, ['CF'], 20, 'Lille'),
      p('ca-22-6', 'Tajon Buchanan', 'Canada', 2022, 'RW', 81, false, ['RM'], 11, 'Club Brugge'),
    ]
  },
  {
    year: 2022,
    country: 'USA',
    countryCode: '🇺🇸',
    flagEmoji: '🇺🇸',
    hostCountry: 'Qatar',
    players: [
      p('us-22-1', 'Matt Turner', 'USA', 2022, 'GK', 83, true, [], 1, 'Arsenal'),
      p('us-22-2', 'Sergiño Dest', 'USA', 2022, 'RB', 82, false, ['RWB', 'LB'], 2, 'AC Milan'),
      p('us-22-3', 'Tyler Adams', 'USA', 2022, 'CDM', 84, false, [], 4, 'Leeds United'),
      p('us-22-4', 'Yunus Musah', 'USA', 2022, 'CM', 82, false, ['RM'], 6, 'Valencia'),
      p('us-22-5', 'Christian Pulisic', 'USA', 2022, 'LW', 86, false, ['LM', 'RW'], 10, 'Chelsea'),
      p('us-22-6', 'Timothy Weah', 'USA', 2022, 'RW', 82, false, ['ST'], 21, 'Lille'),
    ]
  },
  {
    year: 2022,
    country: 'Ecuador',
    countryCode: '🇪🇨',
    flagEmoji: '🇪🇨',
    hostCountry: 'Qatar',
    players: [
      p('ec-22-1', 'Hernán Galíndez', 'Ecuador', 2022, 'GK', 80, true, [], 1, 'Aucas'),
      p('ec-22-2', 'Piero Hincapié', 'Ecuador', 2022, 'CB', 83, false, ['LB'], 3, 'Bayer Leverkusen'),
      p('ec-22-3', 'Pervis Estupiñán', 'Ecuador', 2022, 'LB', 84, false, ['LWB'], 7, 'Brighton'),
      p('ec-22-4', 'Moisés Caicedo', 'Ecuador', 2022, 'CM', 85, false, ['CDM'], 23, 'Brighton'),
      p('ec-22-5', 'Enner Valencia', 'Ecuador', 2022, 'ST', 83, false, ['LW'], 13, 'Fenerbahçe'),
      p('ec-22-6', 'Gonzalo Plata', 'Ecuador', 2022, 'RW', 81, false, ['RM'], 19, 'Real Valladolid'),
    ]
  }
];

/**
 * Returns a random squad challenge with a year & country combination,
 * preferring squads that have unselected players that can fill remaining open positions.
 */
export const getRandomChallenge = (
  excludedIdentifiers: string[] = [],
  unfilledPositions: string[] = []
): WorldCupSquad => {
  const excludedSet = new Set(
    excludedIdentifiers.map((idOrName) => idOrName.toLowerCase())
  );

  const availableSquads = WORLD_CUP_SQUADS.filter((sq) =>
    sq.players.some(
      (p) =>
        !excludedSet.has(p.id.toLowerCase()) &&
        !excludedSet.has(p.name.toLowerCase())
    )
  );

  const basePool = availableSquads.length > 0 ? availableSquads : WORLD_CUP_SQUADS;

  // If there are unfilled positions, prioritize squads containing unselected players eligible for those positions
  if (unfilledPositions.length > 0) {
    const eligibleSquads = basePool.filter((sq) =>
      sq.players.some((p) => {
        if (
          excludedSet.has(p.id.toLowerCase()) ||
          excludedSet.has(p.name.toLowerCase())
        ) {
          return false;
        }
        return unfilledPositions.some((pos) =>
          canPlayerPlayPosition(
            p.primaryPosition,
            p.secondaryPositions,
            pos,
            p.isGoalkeeper
          )
        );
      })
    );

    if (eligibleSquads.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleSquads.length);
      return eligibleSquads[randomIndex];
    }
  }

  const randomIndex = Math.floor(Math.random() * basePool.length);
  return basePool[randomIndex];
};

/**
 * Given a WorldCupSquad, returns up to 4 distinct random unselected players for Easy/Medium mode.
 * Guarantees that at least 1-2 player options can legally play in one of the unfilled positions.
 */
export const getRandomFourPlayers = (
  squad: WorldCupSquad,
  excludedIdentifiers: string[] = [],
  unfilledPositions: string[] = []
): Player[] => {
  const excludedSet = new Set(
    excludedIdentifiers.map((idOrName) => idOrName.toLowerCase())
  );

  // Available (unselected) players in the current challenge squad
  const squadAvailable = squad.players.filter(
    (p) =>
      !excludedSet.has(p.id.toLowerCase()) &&
      !excludedSet.has(p.name.toLowerCase())
  );

  const eligibleInSquad: Player[] = [];
  const otherInSquad: Player[] = [];

  for (const p of squadAvailable) {
    const isEligible =
      unfilledPositions.length === 0 ||
      unfilledPositions.some((pos) =>
        canPlayerPlayPosition(
          p.primaryPosition,
          p.secondaryPositions,
          pos,
          p.isGoalkeeper
        )
      );

    if (isEligible) {
      eligibleInSquad.push(p);
    } else {
      otherInSquad.push(p);
    }
  }

  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledEligible = shuffle(eligibleInSquad);
  const shuffledOther = shuffle(otherInSquad);

  const result: Player[] = [];
  const chosenIds = new Set<string>();

  // Ensure at least 1 (or up to 2) playable option for remaining unfilled positions
  if (unfilledPositions.length > 0) {
    if (shuffledEligible.length > 0) {
      const countToPick = Math.min(2, shuffledEligible.length);
      for (let i = 0; i < countToPick; i++) {
        const p = shuffledEligible.pop()!;
        result.push(p);
        chosenIds.add(p.id.toLowerCase());
      }
    } else {
      // Search globally across all squads for unselected eligible players
      const globalEligible: Player[] = [];
      for (const sq of WORLD_CUP_SQUADS) {
        for (const p of sq.players) {
          const pIdLower = p.id.toLowerCase();
          const pNameLower = p.name.toLowerCase();
          if (
            !excludedSet.has(pIdLower) &&
            !excludedSet.has(pNameLower) &&
            !chosenIds.has(pIdLower)
          ) {
            const isEligible = unfilledPositions.some((pos) =>
              canPlayerPlayPosition(
                p.primaryPosition,
                p.secondaryPositions,
                pos,
                p.isGoalkeeper
              )
            );
            if (isEligible) {
              globalEligible.push(p);
            }
          }
        }
      }

      if (globalEligible.length > 0) {
        const shuffledGlobalEligible = shuffle(globalEligible);
        const countToPick = Math.min(2, shuffledGlobalEligible.length);
        for (let i = 0; i < countToPick; i++) {
          const p = shuffledGlobalEligible.pop()!;
          result.push(p);
          chosenIds.add(p.id.toLowerCase());
        }
      }
    }
  }

  // Fill up to 4 options with remaining squad choices
  const remainingSquadChoices = shuffle([
    ...shuffledEligible,
    ...shuffledOther,
  ]).filter((p) => !chosenIds.has(p.id.toLowerCase()));

  for (const p of remainingSquadChoices) {
    if (result.length >= 4) break;
    result.push(p);
    chosenIds.add(p.id.toLowerCase());
  }

  // Fill remaining slots up to 4 using global unselected players
  if (result.length < 4) {
    const globalOthers: Player[] = [];
    for (const sq of WORLD_CUP_SQUADS) {
      for (const p of sq.players) {
        const pIdLower = p.id.toLowerCase();
        const pNameLower = p.name.toLowerCase();
        if (
          !excludedSet.has(pIdLower) &&
          !excludedSet.has(pNameLower) &&
          !chosenIds.has(pIdLower)
        ) {
          globalOthers.push(p);
          chosenIds.add(pIdLower);
        }
      }
    }
    const shuffledGlobalOthers = shuffle(globalOthers);
    while (result.length < 4 && shuffledGlobalOthers.length > 0) {
      const extra = shuffledGlobalOthers.pop();
      if (extra) result.push(extra);
    }
  }

  // Shuffle final 4 options so the eligible option isn't always at index 0
  return shuffle(result);
};

/**
 * Search helper for Hard mode: fuzzy match against squad players.
 */
export const findMatchingPlayerInSquad = (
  query: string,
  squad: WorldCupSquad | Player[] | null | undefined
): Player | null => {
  const cleanQuery = query?.trim().toLowerCase();
  if (!cleanQuery || !squad) return null;

  const playerList = Array.isArray(squad) ? squad : squad.players;
  if (!playerList || !Array.isArray(playerList)) return null;

  // Direct exact/contains match
  const match = playerList.find((p) => {
    if (!p || !p.name) return false;
    const pName = p.name.toLowerCase();
    // Normalize diacritics / accents
    const normPName = pName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normQuery = cleanQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return pName.includes(cleanQuery) || normPName.includes(normQuery);
  });

  return match || null;
};
