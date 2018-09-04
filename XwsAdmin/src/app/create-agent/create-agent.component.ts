import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() agentCreated = new EventEmitter<Agent>();

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
        component.agentService.createAgent(component.newAgent).subscribe(
          (newAgent) => {
            component.agentCreated.emit(newAgent);
            component.initializeNewAgent();
          },
          (errorResponse) => {
            alert("Remote error! Server response: " + JSON.stringify(errorResponse));
          }
        );
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
