import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Agent } from '../domain/agent';
import { AgentServiceService } from '../services/agent-service.service';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent implements OnInit {

  newAgent: Agent

  constructor(
    private modalService: NgbModal,
    private agentService: AgentServiceService
  ) {
    this.initializeNewAgent();
  }

  ngOnInit() {
  }

  open(content) {
    let component = this;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        component.agentService.createAgent(component.newAgent);
        component.initializeNewAgent();
      }
    );
  }

  initializeNewAgent() {
    this.newAgent = {
      name: "",
      address: "",
      email: "",
      tin: "",
      role: "Agent",
    }
  }

}
