import {isBoolean, isNumber, isFunction, isArray} from './utils/types.js';

// Components
import Toggler from './components/Toggler';
import Slider from './components/Slider';
import Launcher from './components/Launcher';
import Text from './components/Text';
import Select from './components/Select';

export default function createComponent(object, property, array, options) {
  const target = object[property];

  if (array && isArray(array)) {
    return new Select(object, property, array, options);
  } else {
    options = array || {};
  }

  if (isBoolean(target)) return new Toggler(object, property, options);
  if (isNumber(target)) return new Slider(object, property, options);
  if (isFunction(target)) return new Launcher(object, property, options);
  return new Text(object, property, options);
}
