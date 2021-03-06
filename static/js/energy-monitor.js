/**
 * EnergyMonitor
 *
 * UI element representing a device which can monitor power usage.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const Thing = require('./thing');

class EnergyMonitor extends Thing {
  /**
   * EnergyMonitor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {String} format 'svg', 'html', or 'htmlDetail'.
   */
  constructor(description, format) {
    super(
      description,
      format,
      {
        baseIcon: '/optimized-images/thing-icons/energy_monitor.svg',
      }
    );
  }

  get icon() {
    return this.element.querySelector('webthing-energy-monitor-capability');
  }

  /**
   * Update the display for the provided property.
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   */
  updateProperty(name, value) {
    super.updateProperty(name, value);

    if (!this.displayedProperties.hasOwnProperty(name)) {
      return;
    }

    const property = this.displayedProperties[name].property;
    if (property['@type'] === 'InstantaneousPowerProperty' ||
        name === 'instantaneousPower') {
      value = parseFloat(value);
      this.icon.power = value;
    }
  }

  iconView() {
    return `
      <webthing-energy-monitor-capability>
      </webthing-energy-monitor-capability>`;
  }
}

module.exports = EnergyMonitor;
