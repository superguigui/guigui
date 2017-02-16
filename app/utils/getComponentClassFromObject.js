import {isBoolean, isNumber, isFunction} from '../utils/types.js';

// Components
import Toggler from '../components/Toggler';
import Slider from '../components/Slider';
import Launcher from '../components/Launcher';
import Text from '../components/Text';
import Colorpicker from '../components/Colorpicker';
import Select from '../components/Select';

export default function getComponentClassFromObject(object) {
  if (isBoolean(object)) return Toggler;
  if (isNumber(object)) return Slider;
  if (isFunction(object)) return Launcher;
  if (isArray(object)) return Select;
  return Text;
}
