import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClinicalSigns extends Document {
  patient: mongoose.Types.ObjectId;
  lips: {
    clinicalSigns: String;
    observations: String;
  };
  cheeks: {
    clinicalSigns: String;
    observations: String;
  };
  floorMouth: {
    clinicalSigns: String;
    observations: String;
  };
  tongue: {
    clinicalSigns: String;
    observations: String;
  };
  saliva: {
    clinicalSigns: String;
    observations: String;
  };
  gums: {
    clinicalSigns: String;
    observations: String;
  };
  tonsils: {
    clinicalSigns: String;
    observations: String;
  };
  ATM: {
    clinicalSigns: String;
    observations: String;
  };
  nodes: {
    clinicalSigns: String;
    observations: String;
  };
  salivaryGlands: {
    clinicalSigns: String;
    observations: String;
  };
  createdAt: Date;
  updatedAt: Date;
}

const clinicalSignsSchema: Schema<IClinicalSigns> = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    lips: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    cheeks: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    floorMouth: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    tongue: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    saliva: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    gums: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    tonsils: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    ATM: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    nodes: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    salivaryGlands: {
      clinicalSigns: {
        type: String,
        required: false,
      },
      observations: {
        type: String,
        required: false,
      },
    },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true }
);

clinicalSignsSchema.pre<IClinicalSigns>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const ClinicalSigns: Model<IClinicalSigns> = mongoose.model<IClinicalSigns>(
  "ClinicalSigns",
  clinicalSignsSchema
);
export default ClinicalSigns;
