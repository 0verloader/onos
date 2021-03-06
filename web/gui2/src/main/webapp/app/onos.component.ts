/*
 * Copyright 2014-present Open Networking Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from '@angular/core';
import { LionService } from './fw/util/lion.service';
import { LogService } from './log.service';
import { KeyService } from './fw/util/key.service';
import { ThemeService } from './fw/util/theme.service';
import { GlyphService } from './fw/svg/glyph.service';
import { VeilService } from './fw/layer/veil.service';
import { PanelService } from './fw/layer/panel.service';
import { QuickHelpService } from './fw/layer/quickhelp.service';
import { EeService } from './fw/util/ee.service';
import { WebSocketService } from './fw/remote/websocket.service';
import { SpriteService } from './fw/svg/sprite.service';
import { OnosService, View } from './onos.service';

// secret sauce
const sauce: string[] = [
    '6:69857666',
    '9:826970',
    '22:8069828667',
    '6:698570688669887967',
    '7:6971806889847186',
    '22:8369867682',
    '13:736583',
    '7:667186698384',
    '1:857780888778876787',
    '20:70717066',
    '24:886774868469',
    '17:7487696973687580739078',
    '14:70777086',
    '17:7287687967',
    '11:65678869706783687184',
    '1:80777778',
    '9:72696982',
    '7:857165828967',
    '11:8867696882678869759071'
    // Add more sauce...
];

function cap(s: string): string {
    return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/**
 * The main ONOS Component - the root of the whole user interface
 */
@Component({
  selector: 'onos-root',
  templateUrl: './onos.component.html',
  styleUrls: ['./onos.component.css']
})
export class OnosComponent implements OnInit {
    public title = 'onos';

    // view ID to help page url map.. injected via the servlet
    viewMap: View[]  = [
        // {INJECTED-VIEW-DATA-START}
        // {INJECTED-VIEW-DATA-END}
    ];

    defaultView = 'topo';
    // TODO Move this to OnosModule - warning servlet will have to be updated too
    viewDependencies: string[] = [];

    constructor (
        private lion: LionService,
        private ks: KeyService,
        private ts: ThemeService,
        private gs: GlyphService,
        private vs: VeilService,
        private ps: PanelService,
        private qhs: QuickHelpService,
        private ee: EeService,
        private wss: WebSocketService,
        private ss: SpriteService,
        private log: LogService,
        private onos: OnosService
    ) {

// This is not like onos.js of AngularJS 1.x In this new structure modules are
// imported instead in the OnosModule. view dependencies should be there too
//        const moduleDependencies = coreDependencies.concat(this.viewDependencies);

        // Testing of debugging
        log.debug('OnosComponent: testing logger.debug()');
        log.info('OnosComponent: testing logger.info()');
        log.warn('OnosComponent: testing logger.warn()');
        log.error('OnosComponent: testing logger.error()');

        log.debug('OnosComponent constructed');
    }

    ngOnInit() {
        this.viewMap.forEach(view =>
            this.viewDependencies.push('ov' + cap(view.id)));

        this.onos.viewMap = this.viewMap;

//        this.wss.createWebSocket({
//            wsport: Window.location.search().wsport
//        });

        // TODO: Enable this   this.saucy(this.ee, this.ks);
        this.log.debug('OnosComponent initialized');
    }

    saucy(ee, ks) {
        const map = ee.genMap(sauce);
        Object.keys(map).forEach(function (k) {
            ks.addSeq(k, map[k]);
        });
    }
}
