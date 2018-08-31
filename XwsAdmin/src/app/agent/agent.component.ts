import { Component, OnInit } from '@angular/core';
import { Agent } from '../domain/agent';
import { AgentServiceService } from '../services/agent-service.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  agents: Agent[];

  constructor(private agentService: AgentServiceService) { }

  ngOnInit() {
    this.agents = this.agentService.getAgents();
  }

}
